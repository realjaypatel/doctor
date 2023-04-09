


$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

console.log('===>',data)
    var request = {
        "url" : `/post/${data._id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        console.log(response)
        alert("Data Updated Successfully!");
    })

})





    $ondelete = $("a.delete");
    $ondelete.click(function(){
        console.log('asdf')
        var id = $(this).attr("data-id")
console.log(id)
        var request = {
            "url" : `/post/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
