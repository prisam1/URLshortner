import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  const baseURL= 'https://url-cyvu.onrender.com'
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${baseURL}/url/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      })
     
      const data = await response.json()

     console.log(data) 
      if (data.status==="false") {

        setMessage(data.message)
        setShortUrl('')
        
      } else {

        setMessage(data.message)
        setShortUrl(data.data.shortUrl)
        setUrlCode(data.data.urlCode)
        
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

    return (
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          
        />
        <button type="submit">Shorten</button>
      </form>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
   
    {!shortUrl && (
        <div className="error-message">
          <p>{message}</p>
        </div>
      )}
    

      {shortUrl && (
        <div>
          <h3>{message}</h3>
          <p>Shortened URL: <a href={longUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          
        </div>
      )}
    </div>
  )
}

export default App
