
import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient()




export async function getAllCustomers({token}) {
    
        const response = await fetch(`/api/customers`, {

            // Adding method type
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-type": "application/json"
            },


        })
        const resp = await response.json();
        console.log(resp)
        if (!response.ok) {
            const error = new Error('An error occured while fetching customers');
            error.code = response.status;
            error.message = await response.json()
            throw error

        }
        return resp.message

   
}

export async function getCustomerById({token,id}) {
    console.log(token,id)
  
        const response = await fetch('/api/customers/?custID=' + id, {

            // Adding method type
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-type": "application/json"
            },


        })
        const resp = await response.json();
        console.log(resp, "___")
        if (!response.ok) {
            throw 'Something went wrong'

        }

        return resp.message

  
}

export async function addCustomer({customerPayload,token}) {
    const response = await fetch("/api/customers", {

        // Adding method type
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-type": "application/json"
        },

        // Adding body or contents to send
        body: JSON.stringify({
            "basic_details": {
                "username": customerPayload.name,
                "phone_no": customerPayload.phone
            }
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json"
        }
    }

    )


    const resp = await response.json();
    console.log(response)
    if (response.ok) {
        alert("Customer Added Successfully!!");
        document.getElementById('my_modal_5').close()



    } else {
        setError(resp.message)
    }
}