const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {

    console.log('hello')
//   e.preventDefault(); // Prevent the default form submission behavior

//   const formData = new FormData(e.target);
//   const name = formData.get('name');
//   const email = formData.get('email');
//   const comment = formData.get('comment');

//   const requestBody = {
//     name,
//     email,
//     comment
//   };

//   try {
//     const response = await fetch('/submit-comment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data.message); // Log the success message from the server
//       // Optionally, you can perform additional actions, such as clearing the form or displaying a success message
//     } else {
//       const errorData = await response.json();
//       console.error(errorData.error, errorData.messages); // Log the error message from the server
//       // Optionally, you can display the error messages to the user
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     // Handle any network or other errors that occurred during the request
//   }
});