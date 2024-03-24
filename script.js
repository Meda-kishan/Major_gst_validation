class manufacturer
{
    constructor(company_name,location,pan_num,entity,govt_b,gst_num)
    {
        this.company_name=company_name;
        this.location=location
        this.pan_num=pan_num
        this.entity=entity
        this.govt_b=govt_b
        this.gst_num=gst_num
    }
}



function validateGST(gst_i) {
    const umap = new Map();
    let count = 0;

    for (let i = 0; i < 10; i++) {
        umap.set(String(i), count++);
    }

    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        umap.set(String.fromCharCode(i), count++);
    }

    if (gst_i.length !== 15 || gst_i[5] !== 'C') {
        console.log("Invalid Number");
        return false;
    }

    const multipler = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    let hash_sum = 0;

    for (let i = 0; i < 14; i++) {
        const weight = umap.get(gst_i[i]);
        const product = weight * multipler[i];
        const remainder = product % 36;
        const quo = Math.floor(product / 36);
        hash_sum += remainder + quo;
    }

    hash_sum %= 36;
    hash_sum = 36 - hash_sum;

    let fifteenth_char = '';

    for (const [key, value] of umap.entries()) {
        if (value === hash_sum) {
            fifteenth_char = key;
            break;
        }
    }

    if (!fifteenth_char) {
        console.log("Unable to determine fifteenth character.");
        console.log(fifteenth_char)
        return false;
    }

    var gst=gst_i;
    gst=gst_i.slice(0, 13);

    gst = gst_i ;
    gst[14]=fifteenth_char;

    console.log("Hash_sum: " + hash_sum);
    console.log("The fifteenth character is: " + fifteenth_char);
    console.log("GST: " + gst);
    console.log("User GST",gst_i)
    console.log("Original GST",gst)
    return gst_i === gst;
}

// Test
const gst_number = "12ABCD3456E7F8G";
console.log("Is GST Valid? ", validateGST(gst_number));


function sign_up_btn_clicked(event)
{
    document.getElementById("sign-in").style.display="none"
    document.getElementById("sign-up").style.display="block"
}

function sign_in_btn_clicked(event)
{
    document.getElementById("sign-in").style.display="block"
    document.getElementById("sign-up").style.display="none"
}

var all_manufactures=[]

function get_details(event)
{

    var isvalid=true;

    event.preventDefault()
    const form1=document.getElementById("register_details")
    console.log(form1)

    const formdata=new FormData(form1)

    const [company_name,location,pan_num,entity,govt_b,gst_num]=formdata.values()

    const obj =new manufacturer(company_name,location,pan_num,entity,govt_b,gst_num)
    all_manufactures.push(obj)
    // console.log("added succssfully")

    var generated_gst=" "

    const location_code=document.getElementById("location").value
    const pan_number=document.getElementById("pan_number").value


    if(pan_number.length != 10 || pan_number[3]!="C")
    {

        alert("Enter valid PAN details")
        isvalid=false;

        document.getElementById("register_details").reset()
        
    }

    const entity_num=document.getElementById("no_of_entity").value  
    const default_value=document.getElementById("govt").value
    



    generated_gst=generated_gst.concat(location_code,pan_number,entity_num,default_value)
    console.log(generated_gst)
    const result=validateGST(generated_gst)



    const gst_inpt=document.getElementById("gst_num").value

    if(gst_inpt[12]!=entity_num)
    {
        alert("Entity problem")
        document.getElementById("register_details").reset()
        isvalid=false;
        
    }


    const govt_value=document.getElementById("govt").value
    if(govt_value!=gst_inpt[13])
    {
        isvalid=false;
        alert("Govt_value problem")
        document.getElementById("register_details").reset()
    }

if(isvalid)
{
    const result=validateGST(gst_inpt)


    if(result)
    {
        alert("Details are verified and succefully registered")
        document.getElementById("register_details").reset()
    }
    else
    {
        alert("Failed to Register : Incorrect Details")
    }

    console.log("End")

}
else
{
    alert("Enter the valid details")
}
}






function get_data(event)
{
    fetch("https://app.signalx.ai/apps/gst-verification/gstin-overview/29AACCF0683K1ZD",["GET"]).then(data => {

    console.log('Data Received',data)
    })
    .catch(error =>
        {
            console.error("Problem in receiving the data")
        })
}
