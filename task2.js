
function findPairWithSum(nums, target) {
  // Create an empty hash map to store numbers we've seen
  const seenNumbers = new Set();

  // Iterate through the array
  for (let num of nums) {
    // Calculate the complement of the current number
    const complement = target - num;

    // If the complement exists in the set, return the pair
    if (seenNumbers.has(complement)) {
      console.log(`Pair found (${complement}, ${num})`);
      return;
    }

    // Add the current number to the set
    seenNumbers.add(num);
  }

  // If no pair is found
  console.log("Pair not found.");
}

// Example usage:
const nums1 = [8, 7, 2, 5, 3, 1];
const target1 = 10;
findPairWithSum(nums1, target1); // Output: Pair found (8, 2)

const nums2 = [5, 2, 6, 8, 1, 9];
const target2 = 12;
findPairWithSum(nums2, target2); // Output: Pair not found.
