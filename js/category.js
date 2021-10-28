function obtenerCategorias(){
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Category/all',
        type : 'GET',
        dataType : 'json',
        success : function(json, xhr, status){
            //alert("Datos obtenidos correctamente ")
            setTableCategory(json);
            console.log(json);
        }
    }) 
    
}

function setTableCategory(json){
    $("#resultadoCategory").empty();
            tabla = "<center><table border='3'><tr><th>NOMBRE<th>DESCRIPCION"
            filas = ""
            for(let i of json){
               filas += "<tr>"
               filas +="<td>"+i.name  
               filas +="<td>"+i.description
            }
            $("#resultadoCategory").append(tabla + filas+"</center>")
                console.log(json)
}

function autoInicioSelectEliminar(){
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Category/all',
        type : 'GET',
        dataType:'json',
        success:function(json,){
            let $selectBorrar = $("#select-delCategory");
            $.each(json, function(id,name){
                $selectBorrar.append('<option value='+ name.id + '>'+ name.name+'</option>');
            });
        }
    })
}

function autoInicioSelectActualizar(){
    $.ajax({
        url: 'http://144.22.57.2:8080/api/Category/all',
        type : 'GET',
        dataType:'json',
        success:function(json,){
            let $selectActualizar = $("#select-updateCategory");
            $.each(json, function(id,name){
                $selectActualizar.append('<option value='+ name.id + '>'+ name.name+'</option>');
            });
        }
    })
}



function crearCategoria(){

    if($("#nameCategory").val() == "" || $("#descriptionCategory").val() == ""){
        alert("Todos los campos son obligatorios")
    }else{
        let desicion = confirm("Se Creara una nueva Categoria, Desea Continuar?");
        if(desicion){
            let myData = { 
                name: $("#nameCategory").val(),
                description: $("#descriptionCategory").val()
                };
                let dataToSend=JSON.stringify(myData);
                console.log(dataToSend)
            $.ajax({    
                contentType:"application/json",
                data : dataToSend,
                url : 'http://144.22.57.2:8080/api/Category/save',
                type : 'POST',
                dataType: 'json',
                success : function(json, status, xhr) {
                    alert("Categoria creada correctamente " + xhr.status);
                          
                },
                error : function(xhr, status) {        
                    alert("Error al crear categoria "+xhr.status) 
                },
                complete : function(xhr, status) {    
                }   
     
            });
        }  
    }
    window.location.reload();
}

function eliminarCategoria(){
    let desicion =confirm("Se Eliminara la Categoria Seleccionada, Desea Continuar?");
    if(desicion){
        let data = $("#select-delCategory").val();
        $.ajax({
            contentType:"application/json",
            url: 'http://144.22.57.2:8080/api/Category/'+data,
            type:"DELETE",
            dataType:"json",
            success:function(xhr,status){
                alert("Categoria Borrada !!");
               
            }
        })
    }
    window.location.reload(); 
}

function actualizarCategoria(){
    if($("#newNameCategory").val()== "" || $("#newDescriptionCategory").val() == "" ){
        alert("Todos los campos son obligatorios")
    }else{
        let myData = {
            id:$("#select-updateCategory").val(),
            name:$("#newNameCategory").val(),
            description:$("#newDescriptionCategory").val()
        }
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            contentType:"application/json",
            url: 'http://144.22.57.2:8080/api/Category/update',
            type:"PUT",
            dataType:"json",
            data: dataToSend,
            success:function(josn,xhr,status){
                alert("Categoria Correctamente Actualizada");
                
                
            }
        })
    }
    window.location.reload();
}