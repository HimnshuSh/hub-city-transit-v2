// utils/stringUtils.js (or directly in your component file if it's small)

export function capitalizeWords(str) {
  if (!str) return ''; // Handle null or empty string
  return str.split(' ') // Split the string into an array of words
            .map(word => {
              if (word.length === 0) return ''; // Handle multiple spaces
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter, rest lowercase
            })
            .join(' '); // Join the words back into a string
}

// Example usage:
// capitalizeWords("hello world") // "Hello World"
// capitalizeWords("this IS A TEST") // "This Is A Test"