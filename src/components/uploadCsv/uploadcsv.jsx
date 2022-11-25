import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { url } from "../../backend";
const allowedExtensions = ["csv"];

const UploadCSV = () => {
	const [data, setData] = useState([]);
	const [file, setFile] = useState("");
	const handleFileChange = (e) => {
		if (e.target.files.length) {
            console.log('here');
			const inputFile = e.target.files[0];
			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				alert("Please input a csv file");
				return;
			}
			setFile(inputFile);
		}
	};
	const handleParse = () => {
		if (!file) return alert("Enter a valid file");
		const reader = new FileReader();
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
            console.log(csv.data);
			const columns = Object.keys(parsedData[0]);
			setData(columns);
            axios.post(url+'/contact', {contacts: csv.data}, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('token')
                }
            }).then((response)=>{
                console.log(response);
                if(response.data.success) {
                    alert("Save success")
                    window.location.reload()
                } else {
                  alert(response.data.message)
                }
              }).catch((err)=>{
                alert('Please try again after sometime.')
              });
		};
		reader.readAsText(file);
	};

	return (
		<div>
			<input onChange={handleFileChange} id="csvInput" name="file" type="File"/>
            <button onClick={handleParse} className="btn btn-outline-primary">Upload</button>
		</div>
	);
};

export default UploadCSV;
