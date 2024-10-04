const handleCompile = async (code) => {
    const submissionUrl = process.env.API_URL;
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': process.env.API_HOST,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_code: code,
        language_id: 71, // JavaScript language ID
        stdin: '',
        expected_output: 'Hello, World!\n',
      }),
    };
  
    try {
      
      const response = await fetch(submissionUrl, options);
    
      if (response.status === 429) {
        console.error("Rate limit exceeded, please try again later.");
        return "Rate limit exceeded, please wait before trying again.";
      }
  
      const result = await response.json();
      
      const submissionId = result.token;
      if (!submissionId) {
        throw new Error('Failed to get submission ID');
      }
  
    
      const resultUrl = `https://judge029.p.rapidapi.com/submissions/${submissionId}`;
      const resultOptions = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '0790fca7b9msh6eb10872b979677p1d0b8ejsnd12ea78bfdad',
          'x-rapidapi-host': 'judge029.p.rapidapi.com',
        },
      };
  
      let isCompleted = false;
      let outputResult;
      while (!isCompleted) {
        const resultResponse = await fetch(resultUrl, resultOptions);
        const resultData = await resultResponse.json();
  
        if (resultData.status?.id === 3) {

          isCompleted = true;
          outputResult = resultData.stdout || resultData.stderr || 'No output';
        } else if (resultData.status?.id === 6) {
         
          isCompleted = true;
          outputResult = resultData.stderr || 'Compilation error';
        } else if (resultData.status?.id === 1) {
          
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before polling again
        } else {
          
          isCompleted = true;
          outputResult = 'Unknown error occurred.';
        }
      }
  
      return outputResult;
    } catch (error) {
      console.error('Error:', error);
      return 'Failed to compile code';
    }
  };
  
  export default handleCompile;
  