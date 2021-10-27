function obtenerClientes(){
    $.ajax({
        url: 'http://localhost:8080/api/Client/all',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            //alert("Datos obtenidos correctamente");
            setTableCliente(json);
        }
    })
}

function autoInClient(){
    /* Este ajax renderiza el select de eliminar cliente*/
    $.ajax({
        url: 'http://localhost:8080/api/Client/all',
        type : 'GET',
        dataType:'json',
        success:function(json,){
            let $selectBorrar = $("#select-delClient");
            $.each(json, function(id,name){
                $selectBorrar.append('<option value='+ name.idClient + '>'+ name.name+'</option>');
                console.log("select borrar "+name.idClient)
            });
        }
    })

    /*Este ajasx redenriza el select de modificar cliente */
    $.ajax({
        url: 'http://localhost:8080/api/Client/all',
        type : 'GET',
        dataType:'json',
        success:function(json,){
            let $selectModCliente = $("#select-modClient");
            $.each(json, function(id,name){
                $selectModCliente.append('<option value='+ name.idClient + '>'+ name.name+'</option>');
                console.log("select modCliente "+name.idClient)
            });
        }
    })
}


function setTableCliente(json){
    $("#resultadoCliente").empty(json);
            tabla = "<center><table border='3'><tr><th>NOMBRE<th>EDAD<th>CORREO"
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

function eliminarCliente(){
    let desicion =confirm("Se Eliminara el Cliente Seleccionado, Desea Continuar?");
    if(desicion){
        let data = $("#select-delClient").val();
        $.ajax({
            url: 'http://localhost:8080/api/Client/'+data,
            type:"DELETE",
            success:function(xhr,status){
                alert("Cliente Borrado ");
                window.location.reload();
            }
        })
    }
    window.location.reload(); 
}

function crearCliente(){

    if($("#nameCabin").val() == "" || $("#password").val() == "" || $("#email") == "" || $("#edad") == "" ) {
        alert("Todos los campos son obligatorios")
    }else{
        let desicion = confirm("Se Creara un nuevo Cliente, Desea Continuar?");
        if(desicion){
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
                    alert("Cliente creado correctamente " + xhr.status);
                    window.location.reload();   
                },
                error : function(xhr, status) {        
                    alert("Error al crear cliente: "+xhr.status) 
                },
                complete : function(xhr, status) {    
                }   
     
            });
        }
    }
    window.location.reload();
}

function actualizarCliente(){

    if($("#newNameClient").val() == "" || $("#newPassword").val() == "" || $("#newEmail") == "" || $("#newEdad") == "" ) {
        alert("Todos los campos son obligatorios")
    }else{

        let myData = { 
            idClient:$("#select-modClient").val(),
            name: $("#newNameClient").val(),
            password: $("#newPassword").val(),
            email: $("#newEmail").val(),
            age: $("#newEdad").val()
            };
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend)
        $.ajax({    
            contentType:"application/json",
            data : dataToSend,
            url : 'http://localhost:8080/api/Client/update',
            type : 'PUT',
            dataType: 'json',
            success : function(json, status, xhr) {
                alert("Cliente Modificado correctamente " + xhr.status);  
                window.location.reload();    
            },
            error : function(xhr, status) {        
                alert("Error al modificar cliente: "+xhr.status); 
            },
            complete : function(xhr, status) {    
            }   
 
        });
    }
    
}