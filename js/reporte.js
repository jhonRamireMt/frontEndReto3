function obtenerReporteTopReservas(){
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Reservation/report-status',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            //alert("Datos obtenidos correctamente");
            setReportStatus(json);
           
        }
    })
}

function setReportStatus(json){
    $("#report-status").empty();
            tabla = "<center><table border='4'><tr><th>RESERVAS COMPLETADAS<th>RESERVAS CANCELADAS"
            filas = ""
            filas += "<tr>"
            filas +="<td>"+json.completed
            filas +="<td>"+json.cancelled
            
               
               //console.log(items[i])
               
            
            $("#report-status").append(tabla + filas+"</center>")
           // console.log(json)
}

function obtenerReportDates(){
    let dateOne = $("#date-one").val();
    let dateTwo = $("#date-two").val();
    console.log(dateOne+dateTwo);
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Reservation/report-dates/'+dateOne+"/"+dateTwo,
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            //alert("Datos obtenidos correctamente");
            setReportDates(json);
        }
    })
}

function setReportDates(json){
    $("#report-dates").empty();
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
            $("#report-dates").append(tabla + filas+"</center>")
                console.log(json) 
}


function obtenerTopClients(){
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Reservation/report-clients',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            //alert("Datos obtenidos correctamente");
            setReportClients(json);
        }
    })
}

function setReportClients(json){
    $("#report-clients").empty();
            tabla = "<center><table border='3'><tr><th>TOTAL RESERVACIONES<th>NOMBRE CLIENTE<th>EMAIL<th>ID CLIENTE<th>EDAD</th>"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.total 
               filas +="<td>"+i.client.name 
               filas +="<td>"+i.client.email
               filas +="<td>"+i.client.idClient
               filas +="<td>"+i.client.age
            }
            $("#report-clients").append(tabla + filas+"</center>")
                console.log(json) 
}