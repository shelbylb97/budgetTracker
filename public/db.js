// export function useIndexedDb(databaseName, storeName, method, object) {
    // return new Promise((resolve, reject) => {

    const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ;


 let db;

      const request = window.indexedDB.open('budgetTrack', 1);
 
  
      request.onupgradeneeded = function(e) {
        //   console.log(e)
        const db = request.result;
        db.createObjectStore("pending", { autoIncrement: true });
      };
  
      request.onerror = function(e) {
        console.log("There was an error");
      };
  
      request.onsuccess = function(e) {
        db = request.result;


        if(navigator.onLine){
            databaseCheck();
        };
    };

    function saveRec(record){
        //might have to put pending in an array
        const trans = db.transaction('pending',  'readwrite');
        const store = transaction.objectStore('pending');
        store.add(record)
    };

    function databaseCheck(){
         //might have to put pending in an array
        const transaction = db.transaction("pending", 'readwrite');
        const store = transaction.objectStore('pending');
        const getAll = store.getAll();


        getAll.onsuccess = function (){
            if (getAll.result.length > 0){
                fetch("/api/transaction/bulk", {
                    method: "POST",
                    body: JSON.stringify(getAll.result),
                    headers: {
                        Accept: "application/json, text/plain",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(()=>{
                   const transaction = db.transaction("pending", 'readwrite');
                   const store = transaction.objectStore('pending');
                   store.clear();

                })
            }
        }

    };


window.addEventListener("online", databaseCheck);

      

  