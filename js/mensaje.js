

function obtenerMensajes(){
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Message/all',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            alert("Datos obtenidos correctamente");
            setTableMensaje(json);
        }
    })
}


function setTableMensaje(json){
    $("#resultadoMensaje").empty();
            tabla = "<center><table border='1'><tr><th>MENSAJE"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.messageText  
            }
            $("#resultadoMensaje").append(tabla + filas+"</center>")
                console.log(json)
  
}



function crearMensaje(){

    if($("#mensaje").val() == "" ) {
        alert("Todos los campos son obligatorios")
    }else{

        let myData = { 
            messageText: $("#mensaje").val(),
            };
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend)
        $.ajax({    
            contentType:"application/json",
            data : dataToSend,
            url : 'http://144.22.57.2:8080/api/Message/save',
            type : 'POST',
            dataType: 'json',
            success : function(json, status, xhr) {
                alert("Mensje enviado correctamente " + xhr.status)      
            },
            error : function(xhr, status) {        
                alert("Error al crear Mensje: "+xhr.status) 
            },
            complete : function(xhr, status) {    
            }   
 
        });
    }
}