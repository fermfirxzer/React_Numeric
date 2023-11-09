export function term(x,y,n,X){
    console.log("x"+x);
      var result=0,ans=X;
      for(let i=0;i<=n;i++){
          var temp=C(i,i,x,y);
          console.log("i"+temp);
          for(let j=0;j<i;j++){
              temp*=(ans-x[j]);
          }
          result+=temp;
          console.log("r",result);
      }
      return result;
 }
 const C = (n,i,xarr,y) => {
    if(n==0){
        return parseFloat(y[i]);
    }
    else {
        return (C(n-1,i,xarr,y)-C(n-1,i-1,xarr,y))/(xarr[i]-xarr[i-n]);
    }
};
 export function lagrange_recursive(X,Y,n,x) {
    let sum = 0.0;
    for (let i = 0; i <= n; i++) {
        let term = Y[i];
        for (let j = 0; j <= n; j++) {
            if (i !== j) {
                term *= (X[j] - x) / (X[j] - X[i]);
            }
        }
        sum += term;
    }
    return sum;
}