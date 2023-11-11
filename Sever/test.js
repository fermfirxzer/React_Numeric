const pull=async()=>{
    const res=await fetch("url");
    const data=await res.json();
    setequation(data[0].Equation);
    seta(data[0].A);
    setb(data[0].B);
    setn(data[0].N);
}