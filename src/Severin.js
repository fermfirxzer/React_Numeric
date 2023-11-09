function DelData(id) {
    axios.delete(`http://localhost:3001/delete/${id}`);
    
}
function Get(){
    axios.get(`http://localhost:3001/getHistory/${method}`)
                .then(response => {
                    setDataTable(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
        });
}