

function obtenerMensajes(){
    $.ajax({
        url: 'http://localhost:8080/api/Message/all',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            //alert("Datos obtenidos correctamente");
            setTableMensaje(json);
        }
    })
}


function setTableMensaje(json){
    $("#resultadoMensaje").empty();
            tabla = "<center><table border='3'><tr><th>NOMBRE DEL CLIENTE<th>MENSAJE<th>CABAÑA</th>"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.client.name
               filas +="<td>"+i.messageText 
               filas +="<td>"+i.cabin.name
            }
            $("#resultadoMensaje").append(tabla + filas+"</center>")
                console.log(json)
  
}

function autoInicioCabin(){
    console.log("se esta ejecuntando el auto inicio...CABAÑA")
    $.ajax({
        url: 'http://localhost:8080/api/Cabin/all',
        type: 'GET',
        dataType: 'json',
        success:function(json){

            let $select = $("#select-cabin");

            $.each(json, function(id, name){
                $select.append('<option value='+ name.id +'>'+ name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}

function autoInicioClient(){
    console.log("se esta ejecuntando el auto inicio...CLIENTE")
    $.ajax({
        url: 'http://localhost:8080/api/Client/all',
        type: 'GET',
        dataType: 'json',
        success:function(json){

            let $select = $("#select-client");

            $.each(json, function(id, name){
                $select.append('<option value='+ name.idClient +'>'+ name.name+'</option>');
                console.log("select "+name.idClient);
            }); 
        }
    })
}

function crearMensaje(){

    if($("#mensaje").val() == "" ) {
        alert("Todos los campos son obligatorios")
    }else{

        let myData = { 
            messageText: $("#mensaje").val(),
            cabin:{id:$("#select-cabin").val()},
            client:{idClient:$("#select-client").val()}
            };
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend)
        $.ajax({    
            contentType:"application/json",
            data : dataToSend,
            url : 'http://localhost:8080/api/Message/save',
            type : 'POST',
            dataType: 'json',
            success : function(json, status, xhr) {
                alert("Mensje enviado correctamente " + xhr.status)      
            },
            error : function(xhr, status) {        
                alert("Debe exixtir un cliente y una cabaña en el sistema para enviar un mensaje "+xhr.status) 
            },
            complete : function(xhr, status) {    
            }   
 
        });
    }
}