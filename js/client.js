function obtenerClientes(){
    $.ajax({
        url: 'http://localhost:8080/api/Client/all',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            alert("Datos obtenidos correctamente");
            setTableCliente(json);
        }
    })
}


function setTableCliente(json){
    $("#resultadoCliente").empty(json);
            tabla = "<center><table border='1'><tr><th>NOMBRE<th>EDAD<th>CORREO"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.name  
               filas +="<td>"+i.age
               filas +="<td>"+i.email
            }
            $("#resultadoCliente").append(tabla + filas+"</center>")
                console.log(json)   
}

function crearCliente(){

    if($("#nameCabin").val() == "" || $("#password").val() == "" || $("#email") == "" || $("#edad") == "" ) {
        alert("Todos los campos son obligatorios")
    }else{

        let myData = { 
            name: $("#nameClient").val(),
            password: $("#password").val(),
            email: $("#email").val(),
            age: $("#edad").val()
            };
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend)
        $.ajax({    
            contentType:"application/json",
            data : dataToSend,
            url : 'http://localhost:8080/api/Client/save',
            type : 'POST',
            dataType: 'json',
            success : function(json, status, xhr) {
                alert("Cliente creado correctamente " + xhr.status)      
            },
            error : function(xhr, status) {        
                alert("Error al crear cliente: "+xhr.status) 
            },
            complete : function(xhr, status) {    
            }   
 
        });
    }
}