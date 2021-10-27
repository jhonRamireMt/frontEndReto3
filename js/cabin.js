function obtenerCabin(){
    $.ajax({
        url: 'http://localhost:8080/api/Cabin/all',
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
            tabla = "<center><table border='4'><tr><th>NOMBRE<th>MARCA<th>HABITACIONES<th>DESCRIPCION<th>CATEGORIA</th>"
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
    console.log("se esta ejecuntando el auto inicio select-category...")
    $.ajax({
        url: 'http://localhost:8080/api/Category/all',
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

    console.log("se esta ejecuntando el auto inicio eliminar cabin...")
    $.ajax({
        url: 'http://localhost:8080/api/Cabin/all',
        type: 'GET',
        dataType : 'json',
        success : function(json){
            let $select = $("#select-delCabin");

            $.each(json, function(id, name) {

                $select.append('<option value=' + name.id + '>'+ name.name +'</option>');
                
                console.log("select eliminar cabin "+ name.id)
            });
                
        } 
    }) 

    console.log("se esta ejecuntando el auto inicio Actualizar cabin...")
    $.ajax({
        url: 'http://localhost:8080/api/Cabin/all',
        type: 'GET',
        dataType : 'json',
        success : function(json){
            let $select = $("#select-cabinToUpdate");

            $.each(json, function(id, name) {

                $select.append('<option value=' + name.id + '>'+ name.name +'</option>');
                
                console.log("select-cabinToUpdate "+ name.id)

            });
                
        } 
    }) 

    console.log("se esta ejecuntando el auto inicio Actualizar cabin - categoria...")
    $.ajax({
        url: 'http://localhost:8080/api/Category/all',
        type: 'GET',
        dataType : 'json',
        success : function(json){
            let $select = $("#select-cabinToUpdateCategory");

            $.each(json, function(id, name) {

                $select.append('<option value=' + name.id + '>'+ name.name +'</option>');
                
                console.log("select-cabinToUpdate-category "+ name.id)
            });
                
        } 
    }) 
}


function crearCabin(){

    if($("#nameCabin").val() == "" || $("#brandCabin").val() == "" || $("#roomsCabin") == "" || $("#descriptionCabin").val() == "") {
        alert("Todos los campos son obligatorios")
    }else{
        let desicion = confirm("Se Creara una nueva Cabaña, Desea Continuar ?");
        if(desicion){
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
                url : 'http://localhost:8080/api/Cabin/save',
                type : 'POST',
                dataType: 'json',
                success : function(json, status, xhr) {
                    alert("Cabaña creada correctamente " + xhr.status)  
                    window.location.reload();     
                },
                error : function(xhr, status) {        
                    alert("Debe crear una categoria primero: "+xhr.status) 
                },
                complete : function(xhr, status) {   
                     
                }   
     
            }); 
        }         
    }
}

function eliminarCabin(){
    let desicion =confirm("Se Eliminara la Cabaña seleccionada, Desea Continuar ?");
    if(desicion){
        let data = $("#select-delCabin").val();
        $.ajax({
            contentType:"application/json",
            url: 'http://localhost:8080/api/Cabin/'+data,
            type:"DELETE",
            dataType:"json",
            success:function(xhr,status){
                alert("Cabaña Eliminada!");
                window.location.reload(); 
            }
        })
    }
     
}

function actualizarCabin(){
    if($("#newNameCategory").val() == "" || $("#newBrandCabin").val() == "" || $("#newRoomsCabin").val() == "" || $("#newDescriptionCabin").val() == "" ){
        alert("Todos los campos son obligatorios")
    }else{
        let desicion = confirm("Se Modificara la Cabaña Seleccionada, Desea Continuar?");
        if(desicion){
            let myData = {
                id:$("#select-cabinToUpdate").val(),
                name:$("#newNameCabin").val(),
                brand:$("#newBrandCabin").val(),
                rooms:$("#newRoomsCabin").val(),
                description:$("#newDescriptionCabin").val(),
                category:{id:$("#select-cabinToUpdateCategory").val()}
            }
            let dataToSend = JSON.stringify(myData);
            $.ajax({
                contentType:"application/json",
                url: 'http://localhost:8080/api/Cabin/update',
                type:"PUT",
                dataType:"json",
                data: dataToSend,
                success:function(josn,xhr,status){
                    alert("Cabaña Correctamente Actualizada");
                    window.location.reload(); 
                }
            })
        }  
    }
    
}