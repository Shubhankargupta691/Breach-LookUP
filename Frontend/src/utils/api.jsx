
export const handleSearch  = async (input, endpoint, setResult, setError) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setResult(data);
      setError(null); 
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };
  