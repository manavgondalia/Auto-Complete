# Trie Auto-Complete
This project implements a client-side autocomplete feature using a trie data structure in JavaScript. 
The autocomplete functionality is designed for prefix-based completion, providing users with instant suggestions as they type.

## Features

* **Efficient Prefix Matching**: The trie structure enables efficient prefix matching, allowing for quick retrieval of suggestions based on user input.
  > The construction time for the trie data structure used is $O(N*L)$, where $N$ is the number of words in the dictionary and $L$ is the average length of the words.
  > The time of getting a prefix is linear in the length of the prefix retrieved.

* **Client-Side Implementation**: Autocomplete suggestions are generated on the client side, resulting in a responsive user experience without the need for frequent server requests.

* **Lightweight and Fast**: The trie implementation is lightweight and optimized for fast autocomplete performance, making it suitable for both small and large datasets.


## Dictionary

The words for the dictionary in the ```dictionary.txt``` file have been generated using a program to have a dictionary such that no two words have a common prefix of length $> 2$.
