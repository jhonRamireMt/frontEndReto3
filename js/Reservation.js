function obtenerReservas(){
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Reservation/all',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            //alert("Datos obtenidos correctamente");
            setTableReserva(json);
        }
    })
}

function setTableReserva(json){
    $("#resultadoReserva").empty();
            tabla = "<center><table border='3'><tr><th>ID RESERVA<th>INICIO RESERVACION<th>FINAL RESERVACION<th>STATUS<th>NOMBRE CLIENTE<th>CORREO CLIENTE<th>ID CLIENTE<th>CABAÑA RESERVADA</th>"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.idReservation  
               filas +="<td>"+i.startDate 
               filas +="<td>"+i.devolutionDate 
               filas +="<td>"+i.status 
               filas +="<td>"+i.client.name 
               filas +="<td>"+i.client.email
               filas +="<td>"+i.client.idClient
               filas +="<td>"+i.cabin.name
            }
            $("#resultadoReserva").append(tabla + filas+"</center>")
                console.log(json) 
}

function autoInicioClient(){
    console.log("se esta ejecuntando el auto inicio...CLIENTE")
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Client/all',
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

function autoInicioCabin(){
    console.log("se esta ejecuntando el auto inicio...CABAÑA")
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Cabin/all',
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

function crearReservacion(){

    if($("#fechaInicio").val() == "" || $("#fechaFinal").val() == "" ) {
        alert("Todos los campos son obligatorios")
    }else{

        let myData = { 
            startDate: $("#fechaInicio").val(),
            devolutionDate: $("#fechaFinal").val(),
            client:{idClient:$("#select-client").val()},
            cabin:{id:$("#select-cabin").val()}
            };
            console.log("client "+myData.client)
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend)
        $.ajax({    
            contentType:"application/json",
            data : dataToSend,
            url : 'http://144.22.57.2:8080/api/Reservation/save',
            type : 'POST',
            dataType: 'json',
            success : function(json, status, xhr) {
                alert("Reserva creada correctamente " + xhr.status)      
            },
            error : function(xhr, status) {        
                alert("Debe existir previamente en el sistema un cliente y una cabaña para poder realizar una reservacion: ") 
            },
            complete : function(xhr, status) {    
            }   
 
        });
    }
}