function obtenerCategorias(){
    $.ajax({
        url: 'http://localhost:8080/api/Category/all',
        type : 'GET',
        dataType : 'json',
        success : function(json, xhr, status){
            alert("Datos obtenidos correctamente " + xhr.status)
            setTableCategory(json);
            console.log(json);
        }
    }) 
    
}

function setTableCategory(json){
    $("#resultadoCategory").empty();
            tabla = "<center><table border='1'><tr><th>NOMBRE<th>DESCRIPCION"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.name  
               filas +="<td>"+i.description
            }
            $("#resultadoCategory").append(tabla + filas+"</center>")
                console.log(json)
}

function crearCategoria(){

    if($("#nameCategory").val() == "" || $("#descriptionCategory").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        
        let myData = { 
            name: $("#nameCategory").val(),
            description: $("#descriptionCategory").val()
            };
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend)
        $.ajax({    
            contentType:"application/json",
            data : dataToSend,
            url : 'http://localhost:8080/api/Category/save',
            type : 'POST',
            dataType: 'json',
            success : function(json, status, xhr) {
                alert("Categoria creada correctamente " + xhr.status)      
            },
            error : function(xhr, status) {        
                alert("Error al crear categoria "+xhr.status) 
            },
            complete : function(xhr, status) {    
            }   
 
        });
    }
}