

const apiCall = (route, method='GET', body={}) => {
    return new Promise((resolve, reject) => {

        // const headers = new Headers({
        //     'Content-Type': 'application/json',
        // });
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        const requestDetails = {
            method,
            mode: 'cors',
            headers,
            body:{},
        };

        console.log('headers >> '+headers);
        
        if(method !== 'GET') {
            requestDetails.body = JSON.stringify(body);
        }
        console.log("method : "+method);
        console.log("body : "+body);
        console.log("route : "+route);
        const serverUrl = "http://10.21.137.48:8080/sellacastservice/rest/sellacastrestservice";
      //  const serverUrl = "http://127.0.0.1:10010";
        debugger;
        const handleErrors = response => {
            if(response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        };

    //    fetch(`${serverUrl}/${route}`, requestDetails)
    //        .then(handleErrors)
    //        .then(data => resolve(data))
     //       .catch(err => reject(err));

        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(err => {
        //     console.log(err);
        // })

        if(method !== 'GET') {
    
            fetch(`${serverUrl}/${route}`, {
            method: method, 
            body: JSON.stringify(body), 
            mode: "cors",
            headers,
            })
            .then(function(response) {
            return response.json();
            })
            .then(function(myJson) {
            console.log("Response :: "+JSON.stringify(myJson));
            resolve(myJson);
            })
            .catch(err => {
            console.log(err);
            reject(err);
            }); 

        } 
else {
            fetch(`${serverUrl}/${route}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(JSON.stringify(myJson));
                resolve(myJson);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        } 

    });
};

export default apiCall;