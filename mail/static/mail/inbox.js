document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  document.querySelector('#compose-view').onsubmit = send_email();
  //document.querySelectorAll('#emails-view').forEach(function(emails-view) {
  //              button.onfocus = function() {
  //                  document.querySelector("#emails-view").style.color = "blue";
   //             }
   //         });
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3><br>`;
  table = document.createElement('table');
  box = `/emails/${mailbox}`
  fetch(box)
        .then(response => response.json())
        .then(emails => {
          // Print emails

             emails.forEach (item => {
                    // Create a div item for each  email
                    const mail = document.createElement('div');
                    mail.className = 'mail';
                    mail.dataset.id = `${item["id"]}`
                    line = `<span class="col left">${item["recipients"]}</span><span class="col mid">${item["subject"]}</span class="col right"><span>${item["timestamp"]}</span>`
                    mail.innerHTML = line;

                    // Add new element to view:
                    document.querySelector('#emails-view').append(mail);

                     });

         });
     }
function send_email(){
    fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value,
    })
    })
    .then(response => response.json())
    .then(result => {
    // Print result
    console.log(result);
    return load_mailbox('sent');
    });
}


