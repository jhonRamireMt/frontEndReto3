function obtenerReservas(){
    $.ajax({
        url: 'http://localhost:8080/api/Reservation/all',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            alert("Datos obtenidos correctamente");
            setTableReserva(json);
        }
    })
}

function setTableReserva(json){
    $("#resultadoReserva").empty();
            tabla = "<center><table border='1'><tr><th>ID<th>INICIO<th>FINAL<th>STATUS<th>PUNTAJE"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.idReservation  
               filas +="<td>"+i.startDate 
               filas +="<td>"+i.devolutionDate 
               filas +="<td>"+i.status 
               filas +="<td>"+i.score 
            }
            $("#resultadoReserva").append(tabla + filas+"</center>")
                console.log(json) 
}

function crearReservacion(){

    if($("#fechaInicio").val() == "" || $("#fechaFinal").val() == "" ) {
        alert("Todos los campos son obligatorios")
    }else{

        let myData = { 
            startDate: $("#fechaInicio").val(),
            devolutionDate: $("#fechaFinal").val(),
            };
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend)
        $.ajax({    
            contentType:"application/json",
            data : dataToSend,
            url : 'http://localhost:8080/api/Reservation/save',
            type : 'POST',
            dataType: 'json',
            success : function(json, status, xhr) {
                alert("Reserva creada correctamente " + xhr.status)      
            },
            error : function(xhr, status) {        
                alert("Error al crear reserva: "+xhr.status) 
            },
            complete : function(xhr, status) {    
            }   
 
        });
    }
}