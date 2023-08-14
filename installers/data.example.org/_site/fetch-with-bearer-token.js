export async function fetchAndReplaceContent(url, bearerToken) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Accept': 'text/html'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const htmlContent = await response.text();
    document.getElementById('content').innerHTML = htmlContent;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error.message);
  }
}

// Call the function with the bearer token as an argument
// const token = 'abc123';
// fetchAndReplaceContent(token);
