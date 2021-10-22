function obtenerCabin(){
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Cabin/all',
        type: 'GET',
        dataType : 'json',
        success:function(json, status){
            //alert("Datos obtenidos correctamente");
            setTableCabin(json);
        }
    })
}

function setTableCabin(json){
    $("#resultadoCabin").empty();
            tabla = "<center><table border='3'><tr><th>NOMBRE<th>MARCA<th>HABITACIONES<th>DESCRIPCION<th>CATEGORIA</th>"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.name
               filas +="<td>"+i.brand
               filas +="<td>"+i.rooms
               filas +="<td>"+i.description 
               filas +="<td>"+i.category.name;
            }
            $("#resultadoCabin").append(tabla + filas+"</center>")
            console.log(json)
}


function autoInicio(){
    console.log("se esta ejecuntando el auto inicio...")
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Category/all',
        type: 'GET',
        dataType : 'json',
        success : function(json){
            let $select = $("#select-category");

            $.each(json, function(id, name) {

                $select.append('<option value=' + name.id + '>'+ name.name +'</option>');
                
                console.log("select "+ name.id)
            });
                
        } 
    }) 
}


function crearCabin(){

    if($("#nameCabin").val() == "" || $("#brandCabin").val() == "" || $("#roomsCabin") == "" || $("#descriptionCabin").val() == "") {
        alert("Todos los campos son obligatorios")
    }else{
        
        let myData = { 
            name: $("#nameCabin").val(),
            brand: $("#brandCabin").val(),
            rooms: $("#roomsCabin").val(),
            description: $("#descriptionCabin").val(),
            category: {id:$("#select-category").val()},
            };
            console.log("categoria "+myData.category)
           let dataToSend=JSON.stringify(myData); 
           console.log("datos a enviar "+dataToSend)
        $.ajax({    
            contentType:"application/json",
            data : dataToSend,
            url : 'http://144.22.57.2:8080/api/Cabin/save',
            type : 'POST',
            dataType: 'json',
            success : function(json, status, xhr) {
                alert("Cabaña creada correctamente " + xhr.status)      
            },
            error : function(xhr, status) {        
                alert("Debe crear una categoria primero: "+xhr.status) 
            },
            complete : function(xhr, status) {   
                 
            }   
 
        });
    }
}