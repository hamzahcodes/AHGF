export const getUserDetails = async ({ token }) => {
    const res = await fetch('/api/userdetail', {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-type": "application/json"
      },
    })
    const data = await res.json()
    console.log("after receiving data: ", data.data);
    return data.data.username
}