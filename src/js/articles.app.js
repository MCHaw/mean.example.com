var articlesApp = (function() {

    function viewArticles(){

        let uri = `${window.location.origin}/api/articles`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', uri);
      
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
      
        xhr.send();
      
        xhr.onload = function(){
            let app = document.getElementById('app');
            let data = JSON.parse(xhr.response);
            let articles = data.articles;
            let table = '';
            let rows = '';
          
            //Loop each user record into it's own HTML table row, each user should
            //have a link a user view
            for (let i=0; i<articles.length; i++) {
              rows = rows + `<tr>
                <td>
                  <a href="#view-${articles[i]['_id']}">${articles[i]['title']}</a>
                </td>
                <td>${articles[i]['created']}</td>
                <td>${articles[i]['body']}</td>
              </tr>`;
            }
          
            //Create a users panel, add a table to the panel, inject the rows into the
            //table
            table = `<div class="card">
              <div class="card-header clearfix">
                <h2 class="h3 float-left">Articles</h2>
                <div class="float-right">
                  <a href="#create" class="btn btn-primary">New Article</a>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <td>Title</td>
                      <td>Created</td>
                      <td>Body</td>
                    </tr>
                  </thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            </div>`;
          
            //Append the HTML to the #app
            app.innerHTML = table;
          }
      }

      function createArticle(){
        var app = document.getElementById('app');
      
        var form =  `
            <div class="card">
              <div class="card-header clearfix">
                <h2 class="h3 float-left">Create a New Article</h2>
                <div class="float-right">
                  <a href="#" class="btn btn-primary">Cancel</a>
                </div>
              </div>
              <div class="card-body">
                <form id="createArticles" class="card-body">
                  <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
      
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="title">Title</label>
                      <input type="text" id="title" name="title" class="form-control" required>
                    </div>
      
                    <div class="form-group col-md-6">
                      <label for="published">Published</label>
                      <input type="text" id="published" name="published" class="form-control" required>
                    </div>
                  </div>
      
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="body">Body</label>
                      <input type="text" id="body" name="body" class="form-control" required>
                    </div>
      
      
                  <div class="text-right">
                    <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
                  </div>
                </form>
              </div>
            </div>
        `;
      
        app.innerHTML=form;
        processRequest('createArticles', '/api/articles','POST');
      }

      function viewArticle(id){

        let uri = `${window.location.origin}/api/articles/${id}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', uri);
      
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
      
        xhr.send();
      
        xhr.onload = function(){
          let app = document.getElementById('app');
          let data = JSON.parse(xhr.response);
          let card = '';
      
          card = `<div class="card">
            <div class="card-header clearfix">
              <h2 class="h3 float-left">${data.article.title}</h2>
              <div class="float-right">
                <a href="#edit-${data.article._id}" class="btn btn-primary">Edit</a>
              </div>
            </div>
            <div class="card-body">
              <div>${data.article.title} - ${data.article.created}</div>
            </div>
          </div>`;
      
          app.innerHTML = card;
        }
      }
      
      function editArticle(id){

        let uri = `${window.location.origin}/api/articles/${id}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', uri);
      
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
      
        xhr.send();
      
        xhr.onload = function(){
          let app = document.getElementById('app');
          let data = JSON.parse(xhr.response);
        
          var form =  `
            <div class="card">
              <div class="card-header clearfix">
                <h2 class="h3 float-left">Edit</h2>
                <div class="float-right">
                  <a href="#" class="btn btn-primary">Cancel</a>
                </div>
              </div>
              <div class="card-body">
                <form id="editArticles" class="card-body">
                  <input type="hidden" id="_id" name="_id" value="${data.article._id}">
                  <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
        
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="first_name">Title</label>
                      <input type="text" id="title" name="title" class="form-control" value="${data.article.title}" required>
                    </div>
        
                    <div class="form-group col-md-6">
                      <label for="cretws">Created</label>
                      <input type="text" id="created" name="created" class="form-control" value="${data.article.created}" required>
                    </div>
                  </div>
        
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="body">Body</label>
                      <input type="text" id="body" name="body" class="form-control" value="${data.article.body}" required>
                    </div>
        
        
                  <div class="text-right">
                    <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
                  </div>
                </form>
              </div>
            </div>
            <div>
                <a href="#delete-${data.article._id}" class="text-danger">Delete</a>
            </div>
          `;
        
          app.innerHTML=form;

          processRequest('editArticles', '/api/articles','PUT');
        }
      }

      function deleteView(id){

        let uri = `${window.location.origin}/api/articles/${id}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', uri);
      
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
      
        xhr.send();
      
        xhr.onload = function(){
          let app = document.getElementById('app');
          let data = JSON.parse(xhr.response);
          let card = '';
      
          card = `<div class="card bg-transparent border-danger text-danger bg-danger">
            <div class="card-header bg-transparent border-danger">
              <h2 class="h3 text-center">You Are About to Delete an Article</h2>
            </div>
            <div class="card-body text-center">
              <div>
                Are you sure you want to delete
                <strong>${data.article.title} ${data.article.created}</strong>
              </div>
      
              <div>Title: <strong>${data.article.title}</strong></div>
              <div>Created: <strong>${data.article.created}</strong></div>
      
              <div class="text-center">
                <br>
                <a onclick="articlesApp.deleteArticle('${data.article._id}');" class="btn btn-lg btn-danger text-white">
                Yes delete ${data.article.title}
              </a>

              <br><br><br>
              <a class="btn text-muted" href="/articles/cms">cancel</a>  
              </div>
      
            </div>
          </div>`;
      
          app.innerHTML = card;
        }
      }

      function deleteArticle(id){

        let uri = `${window.location.origin}/api/articles/${id}`;
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', uri);
      
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
      
        xhr.send();
      
        xhr.onload = function(){
          let data = JSON.parse(xhr.response);
          if(data.success === true){
            window.location.hash = '#';
          }else{
            alert('Unknown error, the user could not be deleted');
          }
      
        }
      
      }

      function processRequest(formId, url, method){
        let form = document.getElementById(formId);
        form.addEventListener('submit', function(e){
          e.preventDefault();
    
          let formData = new FormData(form);
          let uri = `${window.location.origin}${url}`;
          let xhr = new XMLHttpRequest();
          xhr.open(method, uri);
    
          xhr.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8'
          );
    
          let object = {};
          formData.forEach(function(value, key){
            object[key]=value;
          });
    
          xhr.send(JSON.stringify(object));
          
          xhr.onload = function(){
            let data = JSON.parse(xhr.response);
            if(data.success===true){
              window.location.href = '/articles/cms';
            }else{
              document.getElementById('formMsg').style.display='block';
            }
          }
        });
      }

    return {
      deleteArticle: function(id){
        deleteArticle(id);
      },
        load: function(){
            let hash = window.location.hash;
            let hashArray = hash.split('-');
          
            switch(hashArray[0]){
                case '#create':
                createArticle();
                break;
          
                case '#view':
                viewArticle(hashArray[1]);
                break;
          
              case '#edit':
                editArticle(hashArray[1]);
                break;
          
              case '#delete':
                deleteView(hashArray[1]);
                break;
          
              default:
                viewArticles();
                break;
            }
          }
    }
  
  })();
  
  articlesApp.load();

window.addEventListener("hashchange", function(){
    articlesApp.load();
});