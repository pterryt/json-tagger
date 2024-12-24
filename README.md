## Introduction
This repository hosts a simple Electron app designed to streamline the categorization of words for WFW translation of very large lexicons of names/labels into Japanese.

### Example
If you categorize the words for the names as follows:

- **Alex Rogers**
  - `Alex` → Proper Noun
  - `Rogers` → Proper Noun

- **The Abandoned Ruins**
  - `Abandoned` → Descriptor
  - `Ruins` → Generic Noun

Then categorization for the name **Rogers' Ruins** will be done automatically:
- `Rogers'` → Proper Noun
- `Ruins` → Generic Noun

Input and output are in JSON format.

## Usage
1. **Load a JSON.**
2. **Names containing the most common words appear first.**
3. **Lists will be shown below each part of the name for names sharing the specified word.**
4. **Choose categories for each word.**
5. **Split names where appropriate.**
6. **Categorization Management:**
   - Click **once** to remove the name entirely from the output pool.
   - Click **twice** to exclude the name from this category.
   - Click **a third time** to reset the categorization.
7. **Non-inclusion names will appear again for categorization.**

## Video Example

[![Video Example](https://github.com/user-attachments/assets/a2c0f91a-78f7-4417-af2e-2c06e9d24f65)](https://github.com/user-attachments/assets/a2c0f91a-78f7-4417-af2e-2c06e9d24f65)

