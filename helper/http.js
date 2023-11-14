
import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient()


// CUSTOMERS API's

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
       
        document.getElementById('my_modal_5').close()



    } else {
        setError(resp.message)
    }
}

export async function editCustomer({ customerPayload, token , id ,isPayment }) {

    let payload = isPayment ? {
        "financial_details": {
            "pay_date": customerPayload.payout_date,
            "amount": customerPayload.amount,
            
        }
    } : {
        "goat_details": {
            "goat_type": customerPayload.goat_type,
            "palaai_type": customerPayload.palaai_type,
            "total_amount": customerPayload.amount,
            "off_boarding": null
        }
    }
    const response = await fetch("/api/customers/?custID=" + id, {

        // Adding method type
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-type": "application/json"
        },

        // Adding body or contents to send
        body: JSON.stringify(payload),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json"
        }
    }

    )


    const resp = await response.json();
    console.log(response)
    if (response.ok) {
      
        



    } else {
        setError(resp.message)
    }
}

// SUPPLIERS API's

export async function getAllSuppliers({ token }) {

    const response = await fetch(`/api/suppliers`, {

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

export async function getSupplierById({ token, id }) {
    console.log(token, id)

    const response = await fetch('/api/suppliers/?supplierID=' + id, {

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

export async function addSupplier({ supplierPayload, token }) {
    const response = await fetch("/api/suppliers", {

        // Adding method type
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-type": "application/json"
        },

        // Adding body or contents to send
        body: JSON.stringify({
            
                "supplierName": supplierPayload.name,
                "supplierPhone": supplierPayload.phone
            
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

        document.getElementById('add_supplier_modal').close()



    } else {
        setError(resp.message)
    }
}

export async function editSupplier({ supplierPayload, token, id, }) {

    let payload = {
        "financialTransactions": {
            "payment": supplierPayload.payment,
            // "balance": supplierPayload.balance,
        }
    } 
    const response = await fetch("/api/suppliers/?supplierID=" + id, {

        // Adding method type
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-type": "application/json"
        },

        // Adding body or contents to send
        body: JSON.stringify(payload),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json"
        }
    }

    )


    const resp = await response.json();
    console.log(response)
    if (response.ok) {





    } else {
        setError(resp.message)
    }
}


// STAFF Api's
export async function getAllStaff({ token }) {

    const response = await fetch(`/api/staff`, {

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

export async function addStaff({ staffPayload, token }) {
    const response = await fetch("/api/staff", {

        // Adding method type
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-type": "application/json"
        },

        // Adding body or contents to send
        body: JSON.stringify({

            "name": staffPayload.name,
            "phone": staffPayload.phone,
            "salary":staffPayload.salary

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

        document.getElementById('add_staff_modal').close()



    } else {
        setError(resp.message)
    }
}

export async function editStaff({ staffPayload, token, id, }) {

    let payload = {
        
            "phone": staffPayload.phone,
            "salary": staffPayload.salary,

        
    }
    const response = await fetch("/api/staff/?staffID=" + id, {

        // Adding method type
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-type": "application/json"
        },

        // Adding body or contents to send
        body: JSON.stringify(payload),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json"
        }
    }

    )


    const resp = await response.json();
    console.log(response)
    if (response.ok) {





    } else {
        setError(resp.message)
    }
}