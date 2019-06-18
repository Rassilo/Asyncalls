$("#fetchName").click( _ =>{
    // initialize fields
    initFields();

    doAwait();

    getNamePromise().then(function({results}){
        fillNames(results[0].name,2)
    });

    getNameCallback(data=>{
        fillNames(data.results[0].name,3)
    });

    getNameRX().subscribe(data=>{
        fillNames(data.results[0].name,4)
    });
});

// ------------------- functions
    initFields = () =>{
        for (i = 1 ; i<=4;i++) {
            $("#fetch"+i).html("fetching...");
        }
    }

    fillNames = (data,index) =>{
        const name = `${data.first} ${data.last}`;
        $("#fetch"+index).html(name);
    }

    // wait for the async function getNameAsync()
    doAwait = async() => {
        const data = await getNameAsync();
        fillNames(data.results[0].name,1)
    }

// ------------------- async services

    getNameAsync = async()=>{
        return $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function(data) {
                return data;
            }
        });
    }

    getNamePromise = () => {
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: 'https://randomuser.me/api/',
                dataType: 'json',
                success: function(data) {
                    resolve(data);
                }
            });
        })
    }

    getNameRX = () => {
        return Rx.Observable.create(observer => {
            $.ajax({
                url: 'https://randomuser.me/api/',
                dataType: 'json',
                success: function(data) {
                    observer.next(data);
                }
            });
        })
    }

    getNameCallback = callback =>{
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function(data) {
                callback(data);
            }
        });
    }