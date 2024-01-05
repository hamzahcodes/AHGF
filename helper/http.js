import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

// CUSTOMERS API's

export async function getAllCustomers() {
  const response = await fetch(`/api/customers`, {
    // Adding method type
    method: "GET",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },
  });
  const resp = await response.json();
  console.log(resp);
  if (!response.ok) {
    const error = new Error("An error occured while fetching customers");
    error.code = response.status;
    error.message = await response.json();
    throw error;
  }
  return resp.message;
}

export async function getCustomerById({ id }) {
  console.log({ id });

  const response = await fetch("/api/customers/?custID=" + id, {
    // Adding method type
    method: "GET",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },
  });
  const resp = await response.json();
  console.log(resp, "___");
  if (!response.ok) {
    throw "Something went wrong";
  }

  return resp.message;
}

export async function addCustomer({ customerPayload }) {
  const response = await fetch("/api/customers", {
    // Adding method type
    method: "POST",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },

    // Adding body or contents to send
    body: JSON.stringify({
      basic_details: {
        username: customerPayload.name,
        phone_no: customerPayload.phone,
      },
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json",
    },
  });

  const resp = await response.json();
  console.log(response);
  if (response.ok) {
    document.getElementById("my_modal_5").close();
  } else {
    setError(resp.message);
  }
}

export async function editCustomer({
  customerPayload,
  id,
  isPayment,
  imageFile,
}) {
  const data = new FormData();

  if (isPayment) {
    data.set("type", "financial_details");
    data.set("imageFile", imageFile);
    data.set("pay_date", customerPayload.payout_date);
    data.set("amount", customerPayload.amount);
  } else {
    data.set("type", "goat_details");
    data.set("goat_type", customerPayload.goat_type);
    data.set("palaai_type", customerPayload.palaai_type);
    data.set("total_amount", customerPayload.amount);
    data.set("off_boarding", null);
  }

  //   let payload = isPayment
  //     ? {
  //         financial_details: {
  //           pay_date: customerPayload.payout_date,
  //           amount: customerPayload.amount,
  //           imageFile: imageFile,
  //         },
  //       }
  //     : {
  //         goat_details: {
  //           goat_type: customerPayload.goat_type,
  //           palaai_type: customerPayload.palaai_type,
  //           total_amount: customerPayload.amount,
  //           off_boarding: null,
  //         },
  //       };
  const response = await fetch("/api/customers/?custID=" + id, {
    // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: data,
  });

  const resp = await response.json();
  console.log(response);
  if (response.ok) {
  } else {
    setError(resp.message);
  }
}

// SUPPLIERS API's

export async function getAllSuppliers() {
  const response = await fetch(`/api/suppliers`, {
    // Adding method type
    method: "GET",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },
  });
  const resp = await response.json();
  console.log(resp);
  if (!response.ok) {
    const error = new Error("An error occured while fetching customers");
    error.code = response.status;
    error.message = await response.json();
    throw error;
  }
  return resp.message;
}

export async function getSupplierById({ id }) {
  console.log({ id });

  const response = await fetch("/api/suppliers/?supplierID=" + id, {
    // Adding method type
    method: "GET",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },
  });
  const resp = await response.json();
  console.log(resp, "___");
  if (!response.ok) {
    throw "Something went wrong";
  }

  return resp.message;
}

export async function addSupplier({ supplierPayload }) {
  const response = await fetch("/api/suppliers", {
    // Adding method type
    method: "POST",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },

    // Adding body or contents to send
    body: JSON.stringify({
      supplierName: supplierPayload.name,
      supplierPhone: supplierPayload.phone,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json",
    },
  });

  const resp = await response.json();
  console.log(response);
  if (response.ok) {
    document.getElementById("add_supplier_modal").close();
  } else {
    setError(resp.message);
  }
}

export async function editSupplier({ supplierPayload, id }) {
  let payload = {
    financialTransactions: {
      payment: supplierPayload.payment,
      // "balance": supplierPayload.balance,
    },
  };
  const response = await fetch("/api/suppliers/?supplierID=" + id, {
    // Adding method type
    method: "PUT",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },

    // Adding body or contents to send
    body: JSON.stringify(payload),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json",
    },
  });

  const resp = await response.json();
  console.log(response);
  if (response.ok) {
  } else {
    setError(resp.message);
  }
}

// STAFF Api's
export async function getAllStaff() {
  const response = await fetch(`/api/staff`, {
    // Adding method type
    method: "GET",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },
  });
  const resp = await response.json();
  console.log(resp);
  if (!response.ok) {
    const error = new Error("An error occured while fetching customers");
    error.code = response.status;
    error.message = await response.json();
    throw error;
  }
  return resp.message;
}

export async function addStaff({ staffPayload }) {
  const response = await fetch("/api/staff", {
    // Adding method type
    method: "POST",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },

    // Adding body or contents to send
    body: JSON.stringify({
      name: staffPayload.name,
      phone: staffPayload.phone,
      salary: staffPayload.salary,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json",
    },
  });

  const resp = await response.json();
  console.log(response);
  if (response.ok) {
    document.getElementById("add_staff_modal").close();
  } else {
    setError(resp.message);
  }
}

export async function editStaff({ staffPayload, id }) {
  let payload = {
    phone: staffPayload.phone,
    salary: staffPayload.salary,
  };
  const response = await fetch("/api/staff/?staffID=" + id, {
    // Adding method type
    method: "PUT",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },

    // Adding body or contents to send
    body: JSON.stringify(payload),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json",
    },
  });

  const resp = await response.json();
  console.log(response);
  if (response.ok) {
  } else {
    setError(resp.message);
  }
}

// STOCKS API

export async function getAllStocks() {
  const response = await fetch(`/api/stock`, {
    // Adding method type
    method: "GET",
    headers: {
      // 'Authorization': 'Bearer ' + token,
      "Content-type": "application/json",
    },
  });
  const resp = await response.json();
  console.log(resp);
  if (!response.ok) {
    const error = new Error("An error occured while fetching customers");
    error.code = response.status;
    error.message = await response.json();
    throw error;
  }
  return resp.message;
}

export async function addStock({ stockPayload,id }) {
  const response = await fetch(
    "/api/stock/?supplierID="+id,
    {
      // Adding method type
      method: "POST",
      headers: {
        // 'Authorization': 'Bearer ' + token,
        "Content-type": "application/json",
      },

      // Adding body or contents to send
      body: JSON.stringify({
        stockDetails: {
          name: stockPayload.name,
          quantity: stockPayload.quantity,
          price: stockPayload.price,
        },
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const resp = await response.json();
  console.log(response);
  if (response.ok) {
   return response
  } else {
    setError(resp.message);
  }
}
