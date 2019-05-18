(()=>{
  const invert = hex => {
    if (typeof hex === 'string') {
      hex = [hex];
    }

    return hex.map(item => {
      if (isValidHex(item)) {
        return invertHexColor(item);
      }
    }).filter(x => !!x);     
  }

  //check if hex color is valid
  const isValidHex = hex => {  	
  	const newHex = deleteHashTag(hex)    
    const regexp = /^([A-Fa-f0-9]{3,4}){1,2}$/;

    return regexp.test(newHex);
  }

const deleteHashTag = hex => {
	if (hex.indexOf('#') === 0) {
       return hex.slice(1);
    }
    return hex;
}

const invertHexColor = oldHex => {
    let hex = deleteHashTag(oldHex)
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    // convert 4-digit hex to 8-digits with alpha.
	if (hex.length === 4) {
       const alpha = hex[3] + hex[3];
   	   const hexColor = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
       
 	   return receiveInvColor(hexColor, alpha);      
    }
    // convert 8-digit hex with alpha.
    if (hex.length === 8) {
      const alpha  = hex[6] + hex[6];
      const hexColor = hex[0] + hex[1] + hex[2] + hex[3] + hex[4] + hex[5];
     
      return receiveInvColor(hexColor, alpha); 

    }
	  return receiveInvColor(hex); 
  }

  const receiveInvColor = (hexColor, alpha='') =>{
	return (
         '#'+ hexColor.match(/[a-f0-9]{2}/gi)
          .map(e =>
            ((255 - parseInt(e, 16)) | 0)
              .toString(16)
              .replace(/^([a-f0-9])$/, '0$1')
          )
          .join('') +
        `${alpha}`
      );
}

	console.log(invert('#fafafa'))    //["#050505"]
	console.log( invert('#faf')) //[#005500]
	console.log(invert(['#fafafa','fff','ffaa']))  //["#050505", "#000000", "#000055aa"]
	console.log(invert(['#fafafa', 'weyt', 'ffa']))		//["#050505", "#000055"]
	console.log(invert('#fafafa22'))		//["#05050522"]             

})();


