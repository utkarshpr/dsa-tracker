import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const data = {
  Arrays: [
    // 🚀 Arrays - Easy
    {
      name: "Two Sum",
      company: "Amazon, Google",
      link: "https://leetcode.com/problems/two-sum/",
      intuition: "HashMap to store complements",
      difficulty: "Easy",
    },
    {
      name: "Remove Duplicates from Sorted Array",
      company: "Adobe",
      link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
      intuition: "Two pointer overwrite",
      difficulty: "Easy",
    },
    {
      name: "Move Zeroes",
      company: "Amazon",
      link: "https://leetcode.com/problems/move-zeroes/",
      intuition: "Two pointer swap zeros to end",
      difficulty: "Easy",
    },
    {
      name: "Max Consecutive Ones",
      company: "Google",
      link: "https://leetcode.com/problems/max-consecutive-ones/",
      intuition: "Count consecutive 1s",
      difficulty: "Easy",
    },
    {
      name: "Find Numbers with Even Number of Digits",
      company: "Microsoft",
      link: "https://leetcode.com/problems/find-numbers-with-even-number-of-digits/",
      intuition: "Count digits",
      difficulty: "Easy",
    },
    {
      name: "Squares of a Sorted Array",
      company: "Apple",
      link: "https://leetcode.com/problems/squares-of-a-sorted-array/",
      intuition: "Two pointers from ends",
      difficulty: "Easy",
    },
    {
      name: "Duplicate Zeros",
      company: "Amazon",
      link: "https://leetcode.com/problems/duplicate-zeros/",
      intuition: "Shift and fill zeroes",
      difficulty: "Easy",
    },
    {
      name: "Check If N and Its Double Exist",
      company: "Facebook",
      link: "https://leetcode.com/problems/check-if-n-and-its-double-exist/",
      intuition: "HashSet for quick check",
      difficulty: "Easy",
    },
    {
      name: "Valid Mountain Array",
      company: "Microsoft",
      link: "https://leetcode.com/problems/valid-mountain-array/",
      intuition: "Increasing then decreasing check",
      difficulty: "Easy",
    },
    {
      name: "Replace Elements with Greatest on Right",
      company: "Google",
      link: "https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/",
      intuition: "Traverse from right, track max",
      difficulty: "Easy",
    },
    // 🚀 Arrays - Medium
    {
      name: "3Sum",
      company: "Facebook, Amazon",
      link: "https://leetcode.com/problems/3sum/",
      intuition: "Sorting + two pointer",
      difficulty: "Medium",
    },
    {
      name: "Container With Most Water",
      company: "Amazon",
      link: "https://leetcode.com/problems/container-with-most-water/",
      intuition: "Two pointers maximize area",
      difficulty: "Medium",
    },
    {
      name: "Subarray Sum Equals K",
      company: "Google",
      link: "https://leetcode.com/problems/subarray-sum-equals-k/",
      intuition: "Prefix sum + HashMap",
      difficulty: "Medium",
    },
    {
      name: "Maximum Subarray",
      company: "Apple",
      link: "https://leetcode.com/problems/maximum-subarray/",
      intuition: "Kadane's algorithm",
      difficulty: "Medium",
    },
    {
      name: "Product of Array Except Self",
      company: "Google",
      link: "https://leetcode.com/problems/product-of-array-except-self/",
      intuition: "Prefix & suffix product",
      difficulty: "Medium",
    },
    {
      name: "Sort Colors",
      company: "Facebook",
      link: "https://leetcode.com/problems/sort-colors/",
      intuition: "Dutch National Flag (3-way partition)",
      difficulty: "Medium",
    },
    {
      name: "Longest Consecutive Sequence",
      company: "Amazon",
      link: "https://leetcode.com/problems/longest-consecutive-sequence/",
      intuition: "HashSet + check sequence",
      difficulty: "Medium",
    },
    {
      name: "Rotate Array",
      company: "Google",
      link: "https://leetcode.com/problems/rotate-array/",
      intuition: "Reverse array parts",
      difficulty: "Medium",
    },
    {
      name: "Find Pivot Index",
      company: "Facebook",
      link: "https://leetcode.com/problems/find-pivot-index/",
      intuition: "Prefix vs total sum",
      difficulty: "Medium",
    },
    {
      name: "Minimum Size Subarray Sum",
      company: "Amazon",
      link: "https://leetcode.com/problems/minimum-size-subarray-sum/",
      intuition: "Sliding window",
      difficulty: "Medium",
    },
    {
      name: "Spiral Matrix",
      company: "Google",
      link: "https://leetcode.com/problems/spiral-matrix/",
      intuition: "Layer-by-layer traversal",
      difficulty: "Medium",
    },
    {
      name: "Set Matrix Zeroes",
      company: "Apple",
      link: "https://leetcode.com/problems/set-matrix-zeroes/",
      intuition: "Mark rows & cols",
      difficulty: "Medium",
    },
    {
      name: "Game of Life",
      company: "Amazon",
      link: "https://leetcode.com/problems/game-of-life/",
      intuition: "In-place state marking",
      difficulty: "Medium",
    },
    {
      name: "Merge Intervals",
      company: "Facebook",
      link: "https://leetcode.com/problems/merge-intervals/",
      intuition: "Sort + merge overlaps",
      difficulty: "Medium",
    },
    {
      name: "Insert Interval",
      company: "Google",
      link: "https://leetcode.com/problems/insert-interval/",
      intuition: "Merge with existing intervals",
      difficulty: "Medium",
    },
    {
      name: "Summary Ranges",
      company: "Amazon",
      link: "https://leetcode.com/problems/summary-ranges/",
      intuition: "Track start & end",
      difficulty: "Medium",
    },
    {
      name: "Find the Duplicate Number",
      company: "Google",
      link: "https://leetcode.com/problems/find-the-duplicate-number/",
      intuition: "Floyd’s cycle detection",
      difficulty: "Medium",
    },
    {
      name: "Missing Number",
      company: "Facebook",
      link: "https://leetcode.com/problems/missing-number/",
      intuition: "XOR or sum difference",
      difficulty: "Medium",
    },
    {
      name: "Maximum Product Subarray",
      company: "Apple",
      link: "https://leetcode.com/problems/maximum-product-subarray/",
      intuition: "Track max & min product",
      difficulty: "Medium",
    },
    {
      name: "Search in Rotated Sorted Array",
      company: "Amazon",
      link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      intuition: "Modified binary search",
      difficulty: "Medium",
    },
    // 🚀 Arrays - Hard
    {
      name: "First Missing Positive",
      company: "Google",
      link: "https://leetcode.com/problems/first-missing-positive/",
      intuition: "Index placement cyclic sort",
      difficulty: "Hard",
    },
    {
      name: "Trapping Rain Water",
      company: "Amazon",
      link: "https://leetcode.com/problems/trapping-rain-water/",
      intuition: "Two pointers + max tracking",
      difficulty: "Hard",
    },
    {
      name: "Median of Two Sorted Arrays",
      company: "Google",
      link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      intuition: "Binary search partition",
      difficulty: "Hard",
    },
    {
      name: "Sliding Window Maximum",
      company: "Facebook",
      link: "https://leetcode.com/problems/sliding-window-maximum/",
      intuition: "Monotonic deque",
      difficulty: "Hard",
    },
    {
      name: "Merge k Sorted Lists",
      company: "Amazon",
      link: "https://leetcode.com/problems/merge-k-sorted-lists/",
      intuition: "Min heap",
      difficulty: "Hard",
    },
    {
      name: "Largest Rectangle in Histogram",
      company: "Google",
      link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
      intuition: "Stack for NSL/NSR",
      difficulty: "Hard",
    },
    {
      name: "Maximum Gap",
      company: "Apple",
      link: "https://leetcode.com/problems/maximum-gap/",
      intuition: "Bucket sort",
      difficulty: "Hard",
    },
    {
      name: "Max Points on a Line",
      company: "Google",
      link: "https://leetcode.com/problems/max-points-on-a-line/",
      intuition: "HashMap of slopes",
      difficulty: "Hard",
    },
    {
      name: "Count of Smaller Numbers After Self",
      company: "Amazon",
      link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
      intuition: "Modified merge sort",
      difficulty: "Hard",
    },
    {
      name: "Reverse Pairs",
      company: "Facebook",
      link: "https://leetcode.com/problems/reverse-pairs/",
      intuition: "Merge sort counting",
      difficulty: "Hard",
    },
  ],
 
  BinarySearch: [
    // 🚀 Binary Search (BS) - Easy
    {
      name: "Binary Search",
      company: "Amazon",
      link: "https://leetcode.com/problems/binary-search/",
      intuition: "Classic BS on sorted array",
      difficulty: "Easy",
    },
    {
      name: "Guess Number Higher or Lower",
      company: "Microsoft",
      link: "https://leetcode.com/problems/guess-number-higher-or-lower/",
      intuition: "BS with feedback API",
      difficulty: "Easy",
    },
    {
      name: "First Bad Version",
      company: "Facebook",
      link: "https://leetcode.com/problems/first-bad-version/",
      intuition: "BS with boolean API",
      difficulty: "Easy",
    },
    {
      name: "Search Insert Position",
      company: "Google",
      link: "https://leetcode.com/problems/search-insert-position/",
      intuition: "Lower bound via BS",
      difficulty: "Easy",
    },
    {
      name: "Square Root (x)",
      company: "Apple",
      link: "https://leetcode.com/problems/sqrtx/",
      intuition: "BS for integer sqrt",
      difficulty: "Easy",
    },
    {
      name: "Valid Perfect Square",
      company: "Google",
      link: "https://leetcode.com/problems/valid-perfect-square/",
      intuition: "BS checking square",
      difficulty: "Easy",
    },
    {
      name: "Find Smallest Letter Greater Than Target",
      company: "Amazon",
      link: "https://leetcode.com/problems/find-smallest-letter-greater-than-target/",
      intuition: "BS circular letters",
      difficulty: "Easy",
    },
    {
      name: "Peak Index in a Mountain Array",
      company: "Facebook",
      link: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
      intuition: "BS for peak",
      difficulty: "Easy",
    },
    {
      name: "Kth Missing Positive Number",
      company: "Google",
      link: "https://leetcode.com/problems/kth-missing-positive-number/",
      intuition: "BS on index vs value",
      difficulty: "Easy",
    },
    {
      name: "Search in Rotated Sorted Array II",
      company: "Amazon",
      link: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
      intuition: "BS with duplicates",
      difficulty: "Easy",
    },
  
    // 🚀 Binary Search (BS) - Medium
    {
      name: "Search in Rotated Sorted Array",
      company: "Amazon",
      link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      intuition: "BS with pivot logic",
      difficulty: "Medium",
    },
    {
      name: "Find Minimum in Rotated Sorted Array",
      company: "Google",
      link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      intuition: "BS for min element",
      difficulty: "Medium",
    },
    {
      name: "Find Peak Element",
      company: "Microsoft",
      link: "https://leetcode.com/problems/find-peak-element/",
      intuition: "BS with mid comparison",
      difficulty: "Medium",
    },
    {
      name: "Capacity To Ship Packages Within D Days",
      company: "Amazon",
      link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
      intuition: "BS on answer",
      difficulty: "Medium",
    },
    {
      name: "Koko Eating Bananas",
      company: "Facebook",
      link: "https://leetcode.com/problems/koko-eating-bananas/",
      intuition: "BS on eating speed",
      difficulty: "Medium",
    },
    {
      name: "Find Kth Smallest Pair Distance",
      company: "Google",
      link: "https://leetcode.com/problems/find-k-th-smallest-pair-distance/",
      intuition: "BS on distance",
      difficulty: "Medium",
    },
    {
      name: "Find K Closest Elements",
      company: "Amazon",
      link: "https://leetcode.com/problems/find-k-closest-elements/",
      intuition: "BS + two pointers",
      difficulty: "Medium",
    },
    {
      name: "Aggressive Cows (GFG)",
      company: "",
      link: "https://www.geeksforgeeks.org/aggressive-cows/",
      intuition: "BS on distance",
      difficulty: "Medium",
    },
    {
      name: "Median of Two Sorted Arrays",
      company: "Google",
      link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      intuition: "Partition based BS",
      difficulty: "Medium",
    },
    {
      name: "Split Array Largest Sum",
      company: "Facebook",
      link: "https://leetcode.com/problems/split-array-largest-sum/",
      intuition: "BS on maximum sum",
      difficulty: "Medium",
    },
    {
      name: "Find Duplicate Number",
      company: "Amazon",
      link: "https://leetcode.com/problems/find-the-duplicate-number/",
      intuition: "BS on value range",
      difficulty: "Medium",
    },
    {
      name: "Search a 2D Matrix",
      company: "Apple",
      link: "https://leetcode.com/problems/search-a-2d-matrix/",
      intuition: "2D to 1D BS",
      difficulty: "Medium",
    },
    {
      name: "Search a 2D Matrix II",
      company: "Amazon",
      link: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
      intuition: "BS with matrix properties",
      difficulty: "Medium",
    },
    {
      name: "Guess Number Higher or Lower II",
      company: "Facebook",
      link: "https://leetcode.com/problems/guess-number-higher-or-lower-ii/",
      intuition: "DP + BS",
      difficulty: "Medium",
    },
    {
      name: "Longest Increasing Subsequence (BS version)",
      company: "Google",
      link: "https://leetcode.com/problems/longest-increasing-subsequence/",
      intuition: "Patience sort (BS on tails)",
      difficulty: "Medium",
    },
    {
      name: "Intersection of Two Arrays II",
      company: "Apple",
      link: "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
      intuition: "Sort + BS",
      difficulty: "Medium",
    },
    {
      name: "Find Right Interval",
      company: "Microsoft",
      link: "https://leetcode.com/problems/find-right-interval/",
      intuition: "Map + BS",
      difficulty: "Medium",
    },
    {
      name: "Find Smallest Divisor Given a Threshold",
      company: "Google",
      link: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
      intuition: "BS on divisor",
      difficulty: "Medium",
    },
  
    // 🚀 Binary Search (BS) - Hard
    {
      name: "Median of Two Sorted Arrays",
      company: "Google",
      link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      intuition: "Partition + BS",
      difficulty: "Hard",
    },
    {
      name: "Capacity To Ship Packages Within D Days",
      company: "Amazon",
      link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
      intuition: "BS on answer",
      difficulty: "Hard",
    },
    {
      name: "Find K-th Smallest Pair Distance",
      company: "Facebook",
      link: "https://leetcode.com/problems/find-k-th-smallest-pair-distance/",
      intuition: "BS on distance",
      difficulty: "Hard",
    },
    {
      name: "Split Array Largest Sum",
      company: "Google",
      link: "https://leetcode.com/problems/split-array-largest-sum/",
      intuition: "BS on min max sum",
      difficulty: "Hard",
    },
    {
      name: "Kth Smallest Number in Multiplication Table",
      company: "Amazon",
      link: "https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/",
      intuition: "BS on value space",
      difficulty: "Hard",
    },
    {
      name: "Find a Peak Element II",
      company: "Google",
      link: "https://leetcode.com/problems/find-a-peak-element-ii/",
      intuition: "2D BS",
      difficulty: "Hard",
    },
    {
      name: "Find Minimum in Rotated Sorted Array II",
      company: "Apple",
      link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
      intuition: "BS with duplicates",
      difficulty: "Hard",
    },
    {
      name: "Kth Smallest Element in a Sorted Matrix",
      company: "Facebook",
      link: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
      intuition: "Min heap / BS on value",
      difficulty: "Hard",
    },
    {
      name: "Find the Smallest Divisor Given a Threshold",
      company: "Google",
      link: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
      intuition: "BS on divisor",
      difficulty: "Hard",
    },
    {
      name: "Count Negative Numbers in a Sorted Matrix",
      company: "Amazon",
      link: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
      intuition: "BS in each row",
      difficulty: "Hard",
    },
  ],
  Strings: [
    // 🚀 Strings - Easy
    {
      name: "Valid Palindrome",
      company: "Facebook",
      link: "https://leetcode.com/problems/valid-palindrome/",
      intuition: "Two pointers skip non-alphanum",
      difficulty: "Easy",
    },
    {
      name: "Implement strStr()",
      company: "Amazon",
      link: "https://leetcode.com/problems/implement-strstr/",
      intuition: "Sliding window compare",
      difficulty: "Easy",
    },
    {
      name: "Reverse String",
      company: "Google",
      link: "https://leetcode.com/problems/reverse-string/",
      intuition: "Two pointers swap",
      difficulty: "Easy",
    },
    {
      name: "Reverse Words in a String III",
      company: "Facebook",
      link: "https://leetcode.com/problems/reverse-words-in-a-string-iii/",
      intuition: "Split, reverse each",
      difficulty: "Easy",
    },
    {
      name: "Valid Anagram",
      company: "Amazon",
      link: "https://leetcode.com/problems/valid-anagram/",
      intuition: "Frequency count",
      difficulty: "Easy",
    },
    {
      name: "Longest Common Prefix",
      company: "Google",
      link: "https://leetcode.com/problems/longest-common-prefix/",
      intuition: "Vertical scan",
      difficulty: "Easy",
    },
    {
      name: "First Unique Character in a String",
      company: "Facebook",
      link: "https://leetcode.com/problems/first-unique-character-in-a-string/",
      intuition: "Frequency + index",
      difficulty: "Easy",
    },
    {
      name: "Ransom Note",
      company: "Amazon",
      link: "https://leetcode.com/problems/ransom-note/",
      intuition: "Hash counting",
      difficulty: "Easy",
    },
    {
      name: "Detect Capital",
      company: "Google",
      link: "https://leetcode.com/problems/detect-capital/",
      intuition: "Check cases",
      difficulty: "Easy",
    },
    {
      name: "Count and Say",
      company: "Facebook",
      link: "https://leetcode.com/problems/count-and-say/",
      intuition: "Simulate generation",
      difficulty: "Easy",
    },
  
    // 🚀 Strings - Medium
    {
      name: "Longest Substring Without Repeating Characters",
      company: "Amazon",
      link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      intuition: "Sliding window",
      difficulty: "Medium",
    },
    {
      name: "Longest Palindromic Substring",
      company: "Google",
      link: "https://leetcode.com/problems/longest-palindromic-substring/",
      intuition: "Expand around center",
      difficulty: "Medium",
    },
    {
      name: "Group Anagrams",
      company: "Facebook",
      link: "https://leetcode.com/problems/group-anagrams/",
      intuition: "Hash with sorted key",
      difficulty: "Medium",
    },
    {
      name: "Multiply Strings",
      company: "Amazon",
      link: "https://leetcode.com/problems/multiply-strings/",
      intuition: "Manual multiplication",
      difficulty: "Medium",
    },
    {
      name: "Longest Repeating Character Replacement",
      company: "Google",
      link: "https://leetcode.com/problems/longest-repeating-character-replacement/",
      intuition: "Sliding window freq count",
      difficulty: "Medium",
    },
    {
      name: "Permutation in String",
      company: "Facebook",
      link: "https://leetcode.com/problems/permutation-in-string/",
      intuition: "Sliding window freq match",
      difficulty: "Medium",
    },
    {
      name: "Decode String",
      company: "Amazon",
      link: "https://leetcode.com/problems/decode-string/",
      intuition: "Stack for nested decode",
      difficulty: "Medium",
    },
    {
      name: "String to Integer (atoi)",
      company: "Microsoft",
      link: "https://leetcode.com/problems/string-to-integer-atoi/",
      intuition: "Simulate parsing",
      difficulty: "Medium",
    },
    {
      name: "Compare Version Numbers",
      company: "Google",
      link: "https://leetcode.com/problems/compare-version-numbers/",
      intuition: "Split + compare",
      difficulty: "Medium",
    },
    {
      name: "Simplify Path",
      company: "Facebook",
      link: "https://leetcode.com/problems/simplify-path/",
      intuition: "Stack to track folders",
      difficulty: "Medium",
    },
    {
      name: "Word Break",
      company: "Amazon",
      link: "https://leetcode.com/problems/word-break/",
      intuition: "DP with dictionary",
      difficulty: "Medium",
    },
    {
      name: "Basic Calculator II",
      company: "Google",
      link: "https://leetcode.com/problems/basic-calculator-ii/",
      intuition: "Stack based eval",
      difficulty: "Medium",
    },
    {
      name: "Remove Invalid Parentheses",
      company: "Facebook",
      link: "https://leetcode.com/problems/remove-invalid-parentheses/",
      intuition: "BFS or DFS",
      difficulty: "Medium",
    },
    {
      name: "Is Subsequence",
      company: "Amazon",
      link: "https://leetcode.com/problems/is-subsequence/",
      intuition: "Two pointer",
      difficulty: "Medium",
    },
    {
      name: "Minimum Window Substring",
      company: "Google",
      link: "https://leetcode.com/problems/minimum-window-substring/",
      intuition: "Sliding window",
      difficulty: "Medium",
    },
    {
      name: "Find All Anagrams in a String",
      company: "Facebook",
      link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
      intuition: "Sliding window freq match",
      difficulty: "Medium",
    },
    {
      name: "Longest Palindromic Subsequence",
      company: "Amazon",
      link: "https://leetcode.com/problems/longest-palindromic-subsequence/",
      intuition: "DP reverse match",
      difficulty: "Medium",
    },
    {
      name: "Palindromic Substrings",
      company: "Google",
      link: "https://leetcode.com/problems/palindromic-substrings/",
      intuition: "Expand around center",
      difficulty: "Medium",
    },
    {
      name: "Add Strings",
      company: "Facebook",
      link: "https://leetcode.com/problems/add-strings/",
      intuition: "Manual digit add",
      difficulty: "Medium",
    },
    {
      name: "Valid Parenthesis String",
      company: "Amazon",
      link: "https://leetcode.com/problems/valid-parenthesis-string/",
      intuition: "Greedy balance",
      difficulty: "Medium",
    },
  
    // 🚀 Strings - Hard
    {
      name: "Regular Expression Matching",
      company: "Google",
      link: "https://leetcode.com/problems/regular-expression-matching/",
      intuition: "DP with states",
      difficulty: "Hard",
    },
    {
      name: "Wildcard Matching",
      company: "Facebook",
      link: "https://leetcode.com/problems/wildcard-matching/",
      intuition: "DP with ? and *",
      difficulty: "Hard",
    },
    {
      name: "Edit Distance",
      company: "Amazon",
      link: "https://leetcode.com/problems/edit-distance/",
      intuition: "DP table build",
      difficulty: "Hard",
    },
    {
      name: "Serialize and Deserialize Binary Tree",
      company: "Google",
      link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
      intuition: "Preorder with null marker",
      difficulty: "Hard",
    },
    {
      name: "Basic Calculator",
      company: "Facebook",
      link: "https://leetcode.com/problems/basic-calculator/",
      intuition: "Stack eval with + -",
      difficulty: "Hard",
    },
    {
      name: "Basic Calculator III",
      company: "Google",
      link: "https://leetcode.com/problems/basic-calculator-iii/",
      intuition: "Stack eval with + - * /",
      difficulty: "Hard",
    },
    {
      name: "Minimum Window Substring",
      company: "Amazon",
      link: "https://leetcode.com/problems/minimum-window-substring/",
      intuition: "Sliding window hash",
      difficulty: "Hard",
    },
    {
      name: "Word Ladder",
      company: "Facebook",
      link: "https://leetcode.com/problems/word-ladder/",
      intuition: "BFS with dict",
      difficulty: "Hard",
    },
    {
      name: "Word Ladder II",
      company: "Amazon",
      link: "https://leetcode.com/problems/word-ladder-ii/",
      intuition: "BFS + backtrack",
      difficulty: "Hard",
    },
    {
      name: "Distinct Subsequences",
      company: "Google",
      link: "https://leetcode.com/problems/distinct-subsequences/",
      intuition: "DP count ways",
      difficulty: "Hard",
    },
  ],
  
  LinkedList: [
    // 🚀 Linked List - Easy
    {
      name: "Reverse Linked List",
      company: "Amazon",
      link: "https://leetcode.com/problems/reverse-linked-list/",
      intuition: "Iterative reverse",
      difficulty: "Easy",
    },
    {
      name: "Merge Two Sorted Lists",
      company: "Google",
      link: "https://leetcode.com/problems/merge-two-sorted-lists/",
      intuition: "Dummy node merge",
      difficulty: "Easy",
    },
    {
      name: "Linked List Cycle",
      company: "Facebook",
      link: "https://leetcode.com/problems/linked-list-cycle/",
      intuition: "Floyd's cycle detect",
      difficulty: "Easy",
    },
    {
      name: "Palindrome Linked List",
      company: "Amazon",
      link: "https://leetcode.com/problems/palindrome-linked-list/",
      intuition: "Find middle + reverse half",
      difficulty: "Easy",
    },
    {
      name: "Delete Node in a Linked List",
      company: "Google",
      link: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
      intuition: "Copy next and skip",
      difficulty: "Easy",
    },
    {
      name: "Middle of the Linked List",
      company: "Facebook",
      link: "https://leetcode.com/problems/middle-of-the-linked-list/",
      intuition: "Slow-fast pointer",
      difficulty: "Easy",
    },
    {
      name: "Remove Linked List Elements",
      company: "Amazon",
      link: "https://leetcode.com/problems/remove-linked-list-elements/",
      intuition: "Dummy node + filter",
      difficulty: "Easy",
    },
    {
      name: "Convert Binary Number in LL to Integer",
      company: "Google",
      link: "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/",
      intuition: "Traverse with value build",
      difficulty: "Easy",
    },
    {
      name: "Intersection of Two Linked Lists",
      company: "Facebook",
      link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
      intuition: "Two pointer sync",
      difficulty: "Easy",
    },
    {
      name: "Remove Duplicates from Sorted List",
      company: "Amazon",
      link: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
      intuition: "Traverse and skip",
      difficulty: "Easy",
    },
  
    // 🚀 Linked List - Medium
    {
      name: "Add Two Numbers",
      company: "Amazon",
      link: "https://leetcode.com/problems/add-two-numbers/",
      intuition: "Digit-wise add",
      difficulty: "Medium",
    },
    {
      name: "Odd Even Linked List",
      company: "Google",
      link: "https://leetcode.com/problems/odd-even-linked-list/",
      intuition: "Rearrange pointers",
      difficulty: "Medium",
    },
    {
      name: "Remove Nth Node From End",
      company: "Facebook",
      link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      intuition: "Two pointer offset",
      difficulty: "Medium",
    },
    {
      name: "Copy List with Random Pointer",
      company: "Amazon",
      link: "https://leetcode.com/problems/copy-list-with-random-pointer/",
      intuition: "Clone with map",
      difficulty: "Medium",
    },
    {
      name: "Rotate List",
      company: "Google",
      link: "https://leetcode.com/problems/rotate-list/",
      intuition: "Count, mod, relink",
      difficulty: "Medium",
    },
    {
      name: "Partition List",
      company: "Facebook",
      link: "https://leetcode.com/problems/partition-list/",
      intuition: "Two list merge",
      difficulty: "Medium",
    },
    {
      name: "Swap Nodes in Pairs",
      company: "Amazon",
      link: "https://leetcode.com/problems/swap-nodes-in-pairs/",
      intuition: "Recursion/iteration swap",
      difficulty: "Medium",
    },
    {
      name: "Reorder List",
      company: "Google",
      link: "https://leetcode.com/problems/reorder-list/",
      intuition: "Split, reverse, merge",
      difficulty: "Medium",
    },
    {
      name: "Delete Node in BST",
      company: "Facebook",
      link: "https://leetcode.com/problems/delete-node-in-a-bst/",
      intuition: "Find, replace, recurse",
      difficulty: "Medium",
    },
    {
      name: "Remove Duplicates from Sorted List II",
      company: "Amazon",
      link: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
      intuition: "Dummy, skip dups",
      difficulty: "Medium",
    },
    {
      name: "Flatten a Multilevel Doubly Linked List",
      company: "Google",
      link: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
      intuition: "DFS flatten",
      difficulty: "Medium",
    },
    {
      name: "Insertion Sort List",
      company: "Facebook",
      link: "https://leetcode.com/problems/insertion-sort-list/",
      intuition: "Sort with pointers",
      difficulty: "Medium",
    },
    {
      name: "Sort List",
      company: "Amazon",
      link: "https://leetcode.com/problems/sort-list/",
      intuition: "Merge sort on LL",
      difficulty: "Medium",
    },
    {
      name: "Linked List Cycle II",
      company: "Google",
      link: "https://leetcode.com/problems/linked-list-cycle-ii/",
      intuition: "Floyd's detect start",
      difficulty: "Medium",
    },
    {
      name: "Intersection of Two Linked Lists",
      company: "Facebook",
      link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
      intuition: "Length sync",
      difficulty: "Medium",
    },
    {
      name: "Add Two Numbers II",
      company: "Amazon",
      link: "https://leetcode.com/problems/add-two-numbers-ii/",
      intuition: "Stack or reverse",
      difficulty: "Medium",
    },
    {
      name: "Convert Sorted List to BST",
      company: "Google",
      link: "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/",
      intuition: "Middle node as root",
      difficulty: "Medium",
    },
    {
      name: "Reverse Linked List II",
      company: "Facebook",
      link: "https://leetcode.com/problems/reverse-linked-list-ii/",
      intuition: "Reverse in range",
      difficulty: "Medium",
    },
    {
      name: "Split Linked List in Parts",
      company: "Amazon",
      link: "https://leetcode.com/problems/split-linked-list-in-parts/",
      intuition: "Count, split",
      difficulty: "Medium",
    },
    {
      name: "Flatten Binary Tree to Linked List",
      company: "Google",
      link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
      intuition: "Preorder flatten",
      difficulty: "Medium",
    },
  
    // 🚀 Linked List - Hard
    {
      name: "Merge k Sorted Lists",
      company: "Amazon",
      link: "https://leetcode.com/problems/merge-k-sorted-lists/",
      intuition: "Heap or merge",
      difficulty: "Hard",
    },
    {
      name: "Reverse Nodes in k-Group",
      company: "Google",
      link: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
      intuition: "Reverse blocks",
      difficulty: "Hard",
    },
    {
      name: "LRU Cache",
      company: "Facebook",
      link: "https://leetcode.com/problems/lru-cache/",
      intuition: "Hash + DLL",
      difficulty: "Hard",
    },
    {
      name: "LFU Cache",
      company: "Amazon",
      link: "https://leetcode.com/problems/lfu-cache/",
      intuition: "Hash + DLL freq",
      difficulty: "Hard",
    },
    {
      name: "Copy List with Random Pointer",
      company: "Google",
      link: "https://leetcode.com/problems/copy-list-with-random-pointer/",
      intuition: "O(1) interleave",
      difficulty: "Hard",
    },
    {
      name: "Insert into a Sorted Circular Linked List",
      company: "Facebook",
      link: "https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/",
      intuition: "Find pos, insert",
      difficulty: "Hard",
    },
    {
      name: "Double Linked List Iterator",
      company: "Amazon",
      link: "https://leetcode.com/discuss/interview-question/357310/",
      intuition: "DLL traversal",
      difficulty: "Hard",
    },
    {
      name: "Add Two Huge Numbers",
      company: "Google",
      link: "https://leetcode.com/problems/add-two-numbers-ii/",
      intuition: "Reverse/add/reverse",
      difficulty: "Hard",
    },
    {
      name: "Palindrome Linked List",
      company: "Facebook",
      link: "https://leetcode.com/problems/palindrome-linked-list/",
      intuition: "Fast/slow, reverse",
      difficulty: "Hard",
    },
    {
      name: "Design Browser History",
      company: "Amazon",
      link: "https://leetcode.com/problems/design-browser-history/",
      intuition: "DLL navigation",
      difficulty: "Hard",
    },
  ],
  RecursionBacktracking: [
    { name: "Factorial", company: "Amazon", link: "https://leetcode.com/problems/factorial-trailing-zeroes/", intuition: "Base case and recur", difficulty: "Easy" },
    { name: "Fibonacci Number", company: "Google", link: "https://leetcode.com/problems/fibonacci-number/", intuition: "Base case and recur", difficulty: "Easy" },
    { name: "Power of Two", company: "Facebook", link: "https://leetcode.com/problems/power-of-two/", intuition: "Divide recur", difficulty: "Easy" },
    { name: "Reverse String", company: "Amazon", link: "https://leetcode.com/problems/reverse-string/", intuition: "Two pointer recur", difficulty: "Easy" },
    { name: "Sum of Digits", company: "Google", link: "https://leetcode.com/problems/add-digits/", intuition: "Base + recur", difficulty: "Easy" },
    { name: "Climbing Stairs", company: "Facebook", link: "https://leetcode.com/problems/climbing-stairs/", intuition: "Recur + memoize", difficulty: "Easy" },
    { name: "Print 1 to N", company: "Amazon", link: "https://leetcode.com/discuss/general-discussion/1134337/Print-1-to-N-using-Recursion", intuition: "Base + recur i+1", difficulty: "Easy" },
    { name: "Sum of N Numbers", company: "Google", link: "https://leetcode.com/discuss/interview-question/1386108/Sum-of-n-natural-numbers-using-recursion", intuition: "Base + recur", difficulty: "Easy" },
    { name: "Check Palindrome Recursively", company: "Facebook", link: "https://leetcode.com/problems/valid-palindrome/", intuition: "Compare ends recur", difficulty: "Easy" },
    { name: "Binary Search Recursive", company: "Amazon", link: "https://leetcode.com/problems/binary-search/", intuition: "Mid, recur left/right", difficulty: "Easy" },
    { name: "Subsets", company: "Amazon", link: "https://leetcode.com/problems/subsets/", intuition: "Pick/not-pick recur", difficulty: "Medium" },
    { name: "Subsets II", company: "Google", link: "https://leetcode.com/problems/subsets-ii/", intuition: "Handle duplicates", difficulty: "Medium" },
    { name: "Permutations", company: "Facebook", link: "https://leetcode.com/problems/permutations/", intuition: "Swap backtrack", difficulty: "Medium" },
    { name: "Permutations II", company: "Amazon", link: "https://leetcode.com/problems/permutations-ii/", intuition: "Handle duplicates", difficulty: "Medium" },
    { name: "Combination Sum", company: "Google", link: "https://leetcode.com/problems/combination-sum/", intuition: "Pick/not-pick recur", difficulty: "Medium" },
    { name: "Combination Sum II", company: "Facebook", link: "https://leetcode.com/problems/combination-sum-ii/", intuition: "Sort + skip dups", difficulty: "Medium" },
    { name: "Letter Combinations of a Phone Number", company: "Amazon", link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", intuition: "Map digits, recur", difficulty: "Medium" },
    { name: "Generate Parentheses", company: "Google", link: "https://leetcode.com/problems/generate-parentheses/", intuition: "Count open/close", difficulty: "Medium" },
    { name: "Palindrome Partitioning", company: "Facebook", link: "https://leetcode.com/problems/palindrome-partitioning/", intuition: "Partition and recur", difficulty: "Medium" },
    { name: "Word Search", company: "Amazon", link: "https://leetcode.com/problems/word-search/", intuition: "DFS recur grid", difficulty: "Medium" },
    { name: "Combinations", company: "Google", link: "https://leetcode.com/problems/combinations/", intuition: "Recur with i+1", difficulty: "Medium" },
    { name: "Restore IP Addresses", company: "Facebook", link: "https://leetcode.com/problems/restore-ip-addresses/", intuition: "Split recur", difficulty: "Medium" },
    { name: "N-Queens", company: "Amazon", link: "https://leetcode.com/problems/n-queens/", intuition: "Place safely recur", difficulty: "Medium" },
    { name: "Sudoku Solver", company: "Google", link: "https://leetcode.com/problems/sudoku-solver/", intuition: "Backtracking fill", difficulty: "Medium" },
    { name: "Unique Paths III", company: "Facebook", link: "https://leetcode.com/problems/unique-paths-iii/", intuition: "DFS + backtrack", difficulty: "Medium" },
    { name: "Letter Tile Possibilities", company: "Amazon", link: "https://leetcode.com/problems/letter-tile-possibilities/", intuition: "Backtrack count", difficulty: "Medium" },
    { name: "All Paths From Source to Target", company: "Google", link: "https://leetcode.com/problems/all-paths-from-source-to-target/", intuition: "DFS recur path", difficulty: "Medium" },
    { name: "Beautiful Arrangement", company: "Facebook", link: "https://leetcode.com/problems/beautiful-arrangement/", intuition: "Backtrack", difficulty: "Medium" },
    { name: "Next Permutation", company: "Amazon", link: "https://leetcode.com/problems/next-permutation/", intuition: "Find, reverse", difficulty: "Medium" },
    { name: "Gray Code", company: "Google", link: "https://leetcode.com/problems/gray-code/", intuition: "Mirror recur", difficulty: "Medium" },
    { name: "Word Search II", company: "Amazon", link: "https://leetcode.com/problems/word-search-ii/", intuition: "Trie + backtrack", difficulty: "Hard" },
    { name: "N-Queens II", company: "Google", link: "https://leetcode.com/problems/n-queens-ii/", intuition: "Count only", difficulty: "Hard" },
    { name: "Regular Expression Matching", company: "Facebook", link: "https://leetcode.com/problems/regular-expression-matching/", intuition: "DP with recur", difficulty: "Hard" },
    { name: "Wildcard Matching", company: "Amazon", link: "https://leetcode.com/problems/wildcard-matching/", intuition: "DP with recur", difficulty: "Hard" },
    { name: "Palindrome Partitioning II", company: "Google", link: "https://leetcode.com/problems/palindrome-partitioning-ii/", intuition: "DP + backtrack", difficulty: "Hard" },
    { name: "Expression Add Operators", company: "Facebook", link: "https://leetcode.com/problems/expression-add-operators/", intuition: "DFS with eval", difficulty: "Hard" }
  ],
  StackAndQueue: [
    { name: "Valid Parentheses", company: "Amazon", link: "https://leetcode.com/problems/valid-parentheses/", intuition: "Stack matching", difficulty: "Easy" },
    { name: "Min Stack", company: "Google", link: "https://leetcode.com/problems/min-stack/", intuition: "Stack with min tracking", difficulty: "Easy" },
    { name: "Implement Queue using Stacks", company: "Facebook", link: "https://leetcode.com/problems/implement-queue-using-stacks/", intuition: "Two stacks push/pop", difficulty: "Easy" },
    { name: "Implement Stack using Queues", company: "Amazon", link: "https://leetcode.com/problems/implement-stack-using-queues/", intuition: "Queue simulate stack", difficulty: "Easy" },
    { name: "Baseball Game", company: "Google", link: "https://leetcode.com/problems/baseball-game/", intuition: "Stack add/remove", difficulty: "Easy" },
    { name: "Backspace String Compare", company: "Facebook", link: "https://leetcode.com/problems/backspace-string-compare/", intuition: "Stack simulate backspace", difficulty: "Easy" },
    { name: "Remove All Adjacent Duplicates In String", company: "Amazon", link: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/", intuition: "Stack collapse dups", difficulty: "Easy" },
    { name: "Final Prices With Special Discount", company: "Google", link: "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/", intuition: "Stack next smaller", difficulty: "Easy" },
    { name: "Number of Recent Calls", company: "Facebook", link: "https://leetcode.com/problems/number-of-recent-calls/", intuition: "Queue window", difficulty: "Easy" },
    { name: "Moving Average from Data Stream", company: "Amazon", link: "https://leetcode.com/problems/moving-average-from-data-stream/", intuition: "Queue sliding sum", difficulty: "Easy" },
  
    { name: "Daily Temperatures", company: "Amazon", link: "https://leetcode.com/problems/daily-temperatures/", intuition: "Monotonic stack", difficulty: "Medium" },
    { name: "Next Greater Element I", company: "Google", link: "https://leetcode.com/problems/next-greater-element-i/", intuition: "Stack next greater", difficulty: "Medium" },
    { name: "Next Greater Element II", company: "Facebook", link: "https://leetcode.com/problems/next-greater-element-ii/", intuition: "Circular stack", difficulty: "Medium" },
    { name: "Simplify Path", company: "Amazon", link: "https://leetcode.com/problems/simplify-path/", intuition: "Stack directory", difficulty: "Medium" },
    { name: "Evaluate Reverse Polish Notation", company: "Google", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", intuition: "Stack calc", difficulty: "Medium" },
    { name: "Decode String", company: "Facebook", link: "https://leetcode.com/problems/decode-string/", intuition: "Stack for repeat decode", difficulty: "Medium" },
    { name: "Asteroid Collision", company: "Amazon", link: "https://leetcode.com/problems/asteroid-collision/", intuition: "Stack resolve collision", difficulty: "Medium" },
    { name: "Design Circular Queue", company: "Google", link: "https://leetcode.com/problems/design-circular-queue/", intuition: "Circular queue design", difficulty: "Medium" },
    { name: "Design Circular Deque", company: "Facebook", link: "https://leetcode.com/problems/design-circular-deque/", intuition: "Circular deque design", difficulty: "Medium" },
    { name: "Binary Tree Zigzag Level Order Traversal", company: "Amazon", link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", intuition: "Queue + level reverse", difficulty: "Medium" },
    { name: "Sliding Window Maximum", company: "Google", link: "https://leetcode.com/problems/sliding-window-maximum/", intuition: "Deque for max", difficulty: "Medium" },
    { name: "Min Stack (O(1) getMin)", company: "Facebook", link: "https://leetcode.com/problems/min-stack/", intuition: "Stack with min track", difficulty: "Medium" },
    { name: "Longest Valid Parentheses", company: "Amazon", link: "https://leetcode.com/problems/longest-valid-parentheses/", intuition: "Stack indices", difficulty: "Medium" },
    { name: "Remove K Digits", company: "Google", link: "https://leetcode.com/problems/remove-k-digits/", intuition: "Monotonic stack remove", difficulty: "Medium" },
    { name: "Maximal Rectangle", company: "Facebook", link: "https://leetcode.com/problems/maximal-rectangle/", intuition: "Stack + histogram", difficulty: "Medium" },
    { name: "Largest Rectangle in Histogram", company: "Amazon", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", intuition: "Monotonic stack", difficulty: "Medium" },
    { name: "Implement LRU Cache", company: "Google", link: "https://leetcode.com/problems/lru-cache/", intuition: "Queue/DLL", difficulty: "Medium" },
    { name: "Design Hit Counter", company: "Facebook", link: "https://leetcode.com/problems/design-hit-counter/", intuition: "Queue for hit tracking", difficulty: "Medium" },
    { name: "Sum of Subarray Minimums", company: "Amazon", link: "https://leetcode.com/problems/sum-of-subarray-minimums/", intuition: "Monotonic stack count", difficulty: "Medium" },
    { name: "Sum of Subarray Ranges", company: "Google", link: "https://leetcode.com/problems/sum-of-subarray-ranges/", intuition: "Stack min/max", difficulty: "Medium" },
  
    { name: "Trapping Rain Water", company: "Amazon", link: "https://leetcode.com/problems/trapping-rain-water/", intuition: "Stack for water", difficulty: "Hard" },
    { name: "Remove Duplicate Letters", company: "Google", link: "https://leetcode.com/problems/remove-duplicate-letters/", intuition: "Stack lex order", difficulty: "Hard" },
    { name: "Basic Calculator", company: "Facebook", link: "https://leetcode.com/problems/basic-calculator/", intuition: "Stack eval expr", difficulty: "Hard" },
    { name: "Basic Calculator II", company: "Amazon", link: "https://leetcode.com/problems/basic-calculator-ii/", intuition: "Stack eval mult/div", difficulty: "Hard" },
    { name: "Basic Calculator III", company: "Google", link: "https://leetcode.com/problems/basic-calculator-iii/", intuition: "Stack + parens", difficulty: "Hard" },
    { name: "Largest Rectangle in Histogram", company: "Facebook", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", intuition: "Monotonic stack", difficulty: "Hard" },
    { name: "Maximal Rectangle", company: "Amazon", link: "https://leetcode.com/problems/maximal-rectangle/", intuition: "Histogram + stack", difficulty: "Hard" },
    { name: "LFU Cache", company: "Google", link: "https://leetcode.com/problems/lfu-cache/", intuition: "Queue/freq map", difficulty: "Hard" },
    { name: "Sliding Window Median", company: "Facebook", link: "https://leetcode.com/problems/sliding-window-median/", intuition: "Two heaps", difficulty: "Hard" },
    { name: "Decode Ways II", company: "Amazon", link: "https://leetcode.com/problems/decode-ways-ii/", intuition: "Stack recursion", difficulty: "Hard" }
  ],
  SlidingWindowAndTwoPointer:[
    { name: "Move Zeroes", company: "Amazon", link: "https://leetcode.com/problems/move-zeroes/", intuition: "Two pointers to shift", difficulty: "Easy" },
    { name: "Squares of a Sorted Array", company: "Google", link: "https://leetcode.com/problems/squares-of-a-sorted-array/", intuition: "Two pointers end inward", difficulty: "Easy" },
    { name: "Reverse String", company: "Facebook", link: "https://leetcode.com/problems/reverse-string/", intuition: "Two pointers swap", difficulty: "Easy" },
    { name: "Valid Palindrome", company: "Amazon", link: "https://leetcode.com/problems/valid-palindrome/", intuition: "Two pointers inward", difficulty: "Easy" },
    { name: "Remove Duplicates from Sorted Array", company: "Google", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", intuition: "Two pointers overwrite", difficulty: "Easy" },
    { name: "Longest Substring Without Repeating Characters", company: "Facebook", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", intuition: "Sliding window hashset", difficulty: "Easy" },
    { name: "Maximum Average Subarray I", company: "Amazon", link: "https://leetcode.com/problems/maximum-average-subarray-i/", intuition: "Sliding window sum", difficulty: "Easy" },
    { name: "Implement strStr()", company: "Google", link: "https://leetcode.com/problems/implement-strstr/", intuition: "Two pointers check", difficulty: "Easy" },
    { name: "Check if N and Its Double Exist", company: "Facebook", link: "https://leetcode.com/problems/check-if-n-and-its-double-exist/", intuition: "Two pointers sort", difficulty: "Easy" },
    { name: "Merge Sorted Array", company: "Amazon", link: "https://leetcode.com/problems/merge-sorted-array/", intuition: "Two pointers backward", difficulty: "Easy" },
  
    { name: "Minimum Size Subarray Sum", company: "Google", link: "https://leetcode.com/problems/minimum-size-subarray-sum/", intuition: "Sliding window shrink", difficulty: "Medium" },
    { name: "Subarray Sum Equals K", company: "Facebook", link: "https://leetcode.com/problems/subarray-sum-equals-k/", intuition: "Prefix + hashmap", difficulty: "Medium" },
    { name: "Permutation in String", company: "Amazon", link: "https://leetcode.com/problems/permutation-in-string/", intuition: "Sliding window freq", difficulty: "Medium" },
    { name: "Longest Repeating Character Replacement", company: "Google", link: "https://leetcode.com/problems/longest-repeating-character-replacement/", intuition: "Sliding window count", difficulty: "Medium" },
    { name: "Find All Anagrams in a String", company: "Facebook", link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", intuition: "Sliding window freq", difficulty: "Medium" },
    { name: "Longest Subarray of 1's After Deleting One Element", company: "Amazon", link: "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/", intuition: "Sliding window", difficulty: "Medium" },
    { name: "Fruit Into Baskets", company: "Google", link: "https://leetcode.com/problems/fruit-into-baskets/", intuition: "Window with 2 types", difficulty: "Medium" },
    { name: "Longest Mountain in Array", company: "Facebook", link: "https://leetcode.com/problems/longest-mountain-in-array/", intuition: "Two pointers up/down", difficulty: "Medium" },
    { name: "Remove Duplicates from Sorted Array II", company: "Amazon", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/", intuition: "Two pointers limit", difficulty: "Medium" },
    { name: "Remove Nth Node From End of List", company: "Google", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", intuition: "Two pointers gap", difficulty: "Medium" },
    { name: "Minimum Window Substring", company: "Facebook", link: "https://leetcode.com/problems/minimum-window-substring/", intuition: "Sliding window freq", difficulty: "Medium" },
    { name: "Count Number of Nice Subarrays", company: "Amazon", link: "https://leetcode.com/problems/count-number-of-nice-subarrays/", intuition: "Prefix + hashmap", difficulty: "Medium" },
    { name: "Subarrays with K Different Integers", company: "Google", link: "https://leetcode.com/problems/subarrays-with-k-different-integers/", intuition: "Sliding window count", difficulty: "Medium" },
    { name: "Longest Substring with At Most K Distinct Characters", company: "Facebook", link: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/", intuition: "Sliding window map", difficulty: "Medium" },
    { name: "Sliding Window Maximum", company: "Amazon", link: "https://leetcode.com/problems/sliding-window-maximum/", intuition: "Deque window", difficulty: "Medium" },
    { name: "Find the Duplicate Number", company: "Google", link: "https://leetcode.com/problems/find-the-duplicate-number/", intuition: "Two pointers cycle", difficulty: "Medium" },
    { name: "Sort Colors", company: "Facebook", link: "https://leetcode.com/problems/sort-colors/", intuition: "Two pointers partition", difficulty: "Medium" },
    { name: "Remove Linked List Elements", company: "Amazon", link: "https://leetcode.com/problems/remove-linked-list-elements/", intuition: "Two pointers skip", difficulty: "Medium" },
    { name: "Partition Labels", company: "Google", link: "https://leetcode.com/problems/partition-labels/", intuition: "Two pointers last idx", difficulty: "Medium" },
  
    { name: "Trapping Rain Water", company: "Amazon", link: "https://leetcode.com/problems/trapping-rain-water/", intuition: "Two pointers max", difficulty: "Hard" },
    { name: "Sliding Window Median", company: "Google", link: "https://leetcode.com/problems/sliding-window-median/", intuition: "Two heaps", difficulty: "Hard" },
    { name: "Longest Substring with At Most Two Distinct Characters", company: "Amazon", link: "https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/", intuition: "Window map", difficulty: "Hard" },
    { name: "Longest Continuous Subarray with Absolute Diff Less Than or Equal to Limit", company: "Google", link: "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/", intuition: "Deque track min/max", difficulty: "Hard" },
    { name: "Find the Shortest Superstring", company: "Facebook", link: "https://leetcode.com/problems/find-the-shortest-superstring/", intuition: "DP + bitmask", difficulty: "Hard" },
    { name: "Candy Crush", company: "Amazon", link: "https://leetcode.com/problems/candy-crush/", intuition: "Repeated collapse", difficulty: "Hard" },
    { name: "Max Consecutive Ones III", company: "Google", link: "https://leetcode.com/problems/max-consecutive-ones-iii/", intuition: "Sliding window zeros", difficulty: "Hard" },
    { name: "Substring with Concatenation of All Words", company: "Facebook", link: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/", intuition: "Sliding window", difficulty: "Hard" },
    { name: "Count Vowels Permutation", company: "Amazon", link: "https://leetcode.com/problems/count-vowels-permutation/", intuition: "DP sliding", difficulty: "Hard" }
  ],
  Heap:[
    // 🟩 Easy
    { name: "Kth Largest Element in a Stream", company: "Amazon", link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", intuition: "Maintain min heap of K", difficulty: "Easy" },
    { name: "Last Stone Weight", company: "Google", link: "https://leetcode.com/problems/last-stone-weight/", intuition: "Max heap", difficulty: "Easy" },
    { name: "Find the Kth Largest Integer in the Array", company: "Amazon", link: "https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/", intuition: "Min heap", difficulty: "Easy" },
    { name: "Sort Characters By Frequency", company: "Facebook", link: "https://leetcode.com/problems/sort-characters-by-frequency/", intuition: "Max heap on freq", difficulty: "Easy" },
    { name: "Top K Frequent Words", company: "Google", link: "https://leetcode.com/problems/top-k-frequent-words/", intuition: "Min heap with lex order", difficulty: "Easy" },
    { name: "Kth Smallest Element in a BST", company: "Amazon", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", intuition: "Inorder + count", difficulty: "Easy" },
    { name: "K Closest Elements", company: "Facebook", link: "https://leetcode.com/problems/find-k-closest-elements/", intuition: "Two pointer or heap", difficulty: "Easy" },
    { name: "Find K Closest Numbers", company: "Amazon", link: "https://leetcode.com/problems/find-k-closest-elements/", intuition: "Heap with distance", difficulty: "Easy" },
    { name: "Sort Array By Increasing Frequency", company: "Google", link: "https://leetcode.com/problems/sort-array-by-increasing-frequency/", intuition: "Heap on freq", difficulty: "Easy" },
    { name: "Relative Ranks", company: "Amazon", link: "https://leetcode.com/problems/relative-ranks/", intuition: "Max heap", difficulty: "Easy" },
  
    // 🟧 Medium
    { name: "Kth Largest Element in an Array", company: "Amazon", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", intuition: "Min heap of size K", difficulty: "Medium" },
    { name: "Top K Frequent Elements", company: "Google", link: "https://leetcode.com/problems/top-k-frequent-elements/", intuition: "Min heap on freq", difficulty: "Medium" },
    { name: "K Closest Points to Origin", company: "Facebook", link: "https://leetcode.com/problems/k-closest-points-to-origin/", intuition: "Max heap on distance", difficulty: "Medium" },
    { name: "Kth Smallest Element in a Sorted Matrix", company: "Amazon", link: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", intuition: "Min heap with pointers", difficulty: "Medium" },
    { name: "Task Scheduler", company: "Google", link: "https://leetcode.com/problems/task-scheduler/", intuition: "Max heap on char freq", difficulty: "Medium" },
    { name: "Furthest Building You Can Reach", company: "Facebook", link: "https://leetcode.com/problems/furthest-building-you-can-reach/", intuition: "Min heap for ladders", difficulty: "Medium" },
    { name: "Minimum Cost to Connect Sticks", company: "Amazon", link: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/", intuition: "Min heap greedy combine", difficulty: "Medium" },
    { name: "Smallest Range Covering Elements from K Lists", company: "Google", link: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", intuition: "Min heap + max tracking", difficulty: "Medium" },
    { name: "IPO", company: "Facebook", link: "https://leetcode.com/problems/ipo/", intuition: "Two heaps for cap/profit", difficulty: "Medium" },
    { name: "Find K Pairs with Smallest Sums", company: "Amazon", link: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/", intuition: "Min heap", difficulty: "Medium" },
    { name: "The Skyline Problem", company: "Google", link: "https://leetcode.com/problems/the-skyline-problem/", intuition: "Max heap", difficulty: "Medium" },
    { name: "Kth Smallest Prime Fraction", company: "Facebook", link: "https://leetcode.com/problems/kth-smallest-prime-fraction/", intuition: "Min heap", difficulty: "Medium" },
    { name: "Sliding Window Median", company: "Amazon", link: "https://leetcode.com/problems/sliding-window-median/", intuition: "Two heaps", difficulty: "Medium" },
    { name: "Find Median from Data Stream", company: "Google", link: "https://leetcode.com/problems/find-median-from-data-stream/", intuition: "Max+Min heaps", difficulty: "Medium" },
    { name: "Merge K Sorted Lists", company: "Facebook", link: "https://leetcode.com/problems/merge-k-sorted-lists/", intuition: "Min heap", difficulty: "Medium" },
    { name: "Merge K Sorted Arrays", company: "Amazon", link: "https://leetcode.com/problems/merge-k-sorted-lists/", intuition: "Min heap", difficulty: "Medium" },
    { name: "Trapping Rain Water II", company: "Google", link: "https://leetcode.com/problems/trapping-rain-water-ii/", intuition: "Min heap on boundary", difficulty: "Medium" },
    { name: "Super Ugly Number", company: "Facebook", link: "https://leetcode.com/problems/super-ugly-number/", intuition: "Min heap for factors", difficulty: "Medium" },
    { name: "Find K Closest Points to Given Point", company: "Amazon", link: "https://leetcode.com/problems/k-closest-points-to-origin/", intuition: "Max heap", difficulty: "Medium" },
    { name: "Find Median in Running Stream", company: "Google", link: "https://leetcode.com/problems/find-median-from-data-stream/", intuition: "Two heaps", difficulty: "Medium" },
  
    // 🟥 Hard
    { name: "Trapping Rain Water II", company: "Amazon", link: "https://leetcode.com/problems/trapping-rain-water-ii/", intuition: "Min heap boundary filling", difficulty: "Hard" },
    { name: "Sliding Window Median", company: "Google", link: "https://leetcode.com/problems/sliding-window-median/", intuition: "Two heaps with erase", difficulty: "Hard" },
    { name: "The Skyline Problem", company: "Facebook", link: "https://leetcode.com/problems/the-skyline-problem/", intuition: "Max heap on heights", difficulty: "Hard" },
    { name: "Minimum Cost to Hire K Workers", company: "Amazon", link: "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/", intuition: "Min heap with ratio", difficulty: "Hard" },
    { name: "Merge K Sorted Lists", company: "Google", link: "https://leetcode.com/problems/merge-k-sorted-lists/", intuition: "Min heap", difficulty: "Hard" },
    { name: "Find Median from Data Stream", company: "Facebook", link: "https://leetcode.com/problems/find-median-from-data-stream/", intuition: "Two heaps", difficulty: "Hard" },
    { name: "IPO", company: "Amazon", link: "https://leetcode.com/problems/ipo/", intuition: "Max heap and min heap", difficulty: "Hard" },
    { name: "Kth Smallest Prime Fraction", company: "Google", link: "https://leetcode.com/problems/kth-smallest-prime-fraction/", intuition: "Min heap", difficulty: "Hard" },
    { name: "Super Ugly Number", company: "Facebook", link: "https://leetcode.com/problems/super-ugly-number/", intuition: "Min heap factors", difficulty: "Hard" },
    { name: "Smallest Range Covering Elements from K Lists", company: "Amazon", link: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", intuition: "Min heap + max tracking", difficulty: "Hard" }
  ],
  Greedy :[
  { "name": "Assign Cookies", "company": "Amazon", "link": "https://leetcode.com/problems/assign-cookies/", "intuition": "Sort and greedily assign", "difficulty": "Easy" },
  { "name": "Best Time to Buy and Sell Stock II", "company": "Google", "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", "intuition": "Sum all profitable diffs", "difficulty": "Easy" },
  { "name": "Lemonade Change", "company": "Facebook", "link": "https://leetcode.com/problems/lemonade-change/", "intuition": "Greedily give change", "difficulty": "Easy" },
  { "name": "Can Place Flowers", "company": "Amazon", "link": "https://leetcode.com/problems/can-place-flowers/", "intuition": "Greedy check neighbors", "difficulty": "Easy" },
  { "name": "Monotonic Array", "company": "Google", "link": "https://leetcode.com/problems/monotonic-array/", "intuition": "Check increasing/decreasing", "difficulty": "Easy" },
  { "name": "Is Subsequence", "company": "Facebook", "link": "https://leetcode.com/problems/is-subsequence/", "intuition": "Two pointers", "difficulty": "Easy" },
  { "name": "Non-decreasing Array", "company": "Amazon", "link": "https://leetcode.com/problems/non-decreasing-array/", "intuition": "Modify at most once", "difficulty": "Easy" },
  { "name": "Distribute Candies", "company": "Google", "link": "https://leetcode.com/problems/distribute-candies/", "intuition": "Max unique candies", "difficulty": "Easy" },
  { "name": "Relative Ranks", "company": "Facebook", "link": "https://leetcode.com/problems/relative-ranks/", "intuition": "Sort with ranks", "difficulty": "Easy" },
  { "name": "Valid Parenthesis String", "company": "Amazon", "link": "https://leetcode.com/problems/valid-parenthesis-string/", "intuition": "Greedy with counters", "difficulty": "Easy" },

  // 🟧 Medium (20)
  { "name": "Jump Game", "company": "Amazon", "link": "https://leetcode.com/problems/jump-game/", "intuition": "Max reachable index", "difficulty": "Medium" },
  { "name": "Jump Game II", "company": "Google", "link": "https://leetcode.com/problems/jump-game-ii/", "intuition": "Greedy layer jumps", "difficulty": "Medium" },
  { "name": "Partition Labels", "company": "Facebook", "link": "https://leetcode.com/problems/partition-labels/", "intuition": "Greedy last occurrence", "difficulty": "Medium" },
  { "name": "Gas Station", "company": "Amazon", "link": "https://leetcode.com/problems/gas-station/", "intuition": "Greedy circular check", "difficulty": "Medium" },
  { "name": "Non-overlapping Intervals", "company": "Google", "link": "https://leetcode.com/problems/non-overlapping-intervals/", "intuition": "Sort end times", "difficulty": "Medium" },
  { "name": "Queue Reconstruction by Height", "company": "Facebook", "link": "https://leetcode.com/problems/queue-reconstruction-by-height/", "intuition": "Sort + insert", "difficulty": "Medium" },
  { "name": "Candy", "company": "Amazon", "link": "https://leetcode.com/problems/candy/", "intuition": "Two pass distribute", "difficulty": "Medium" },
  { "name": "Minimum Number of Arrows to Burst Balloons", "company": "Google", "link": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", "intuition": "Sort by end, count shots", "difficulty": "Medium" },
  { "name": "Minimum Cost to Connect Sticks", "company": "Facebook", "link": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/", "intuition": "Min heap combine", "difficulty": "Medium" },
  { "name": "Advantage Shuffle", "company": "Amazon", "link": "https://leetcode.com/problems/advantage-shuffle/", "intuition": "Greedy sort", "difficulty": "Medium" },
  { "name": "Reorganize String", "company": "Google", "link": "https://leetcode.com/problems/reorganize-string/", "intuition": "Greedy + max heap", "difficulty": "Medium" },
  { "name": "Split Array into Consecutive Subsequences", "company": "Facebook", "link": "https://leetcode.com/problems/split-array-into-consecutive-subsequences/", "intuition": "HashMap + greedy extend", "difficulty": "Medium" },
  { "name": "Bag of Tokens", "company": "Amazon", "link": "https://leetcode.com/problems/bag-of-tokens/", "intuition": "Greedy play tokens", "difficulty": "Medium" },
  { "name": "Hand of Straights", "company": "Google", "link": "https://leetcode.com/problems/hand-of-straights/", "intuition": "Greedy map use", "difficulty": "Medium" },
  { "name": "Maximum Swap", "company": "Facebook", "link": "https://leetcode.com/problems/maximum-swap/", "intuition": "Greedy swap", "difficulty": "Medium" },
  { "name": "Boats to Save People", "company": "Amazon", "link": "https://leetcode.com/problems/boats-to-save-people/", "intuition": "Two pointers", "difficulty": "Medium" },
  { "name": "Koko Eating Bananas", "company": "Google", "link": "https://leetcode.com/problems/koko-eating-bananas/", "intuition": "Binary search on speed", "difficulty": "Medium" },
  { "name": "Find Minimum in Rotated Sorted Array", "company": "Facebook", "link": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", "intuition": "Binary search", "difficulty": "Medium" },
  { "name": "Partition Array into Disjoint Intervals", "company": "Amazon", "link": "https://leetcode.com/problems/partition-array-into-disjoint-intervals/", "intuition": "Track left max", "difficulty": "Medium" },
  { "name": "Task Scheduler", "company": "Google", "link": "https://leetcode.com/problems/task-scheduler/", "intuition": "Greedy max freq", "difficulty": "Medium" },

  // 🟥 Hard (10)
  { "name": "Trapping Rain Water", "company": "Amazon", "link": "https://leetcode.com/problems/trapping-rain-water/", "intuition": "Two pointers", "difficulty": "Hard" },
  { "name": "Create Maximum Number", "company": "Google", "link": "https://leetcode.com/problems/create-maximum-number/", "intuition": "Greedy pick", "difficulty": "Hard" },
  { "name": "Minimum Number of Refueling Stops", "company": "Facebook", "link": "https://leetcode.com/problems/minimum-number-of-refueling-stops/", "intuition": "Max heap", "difficulty": "Hard" },
  { "name": "Cherry Pickup II", "company": "Amazon", "link": "https://leetcode.com/problems/cherry-pickup-ii/", "intuition": "DP + greedy moves", "difficulty": "Hard" },
  { "name": "Minimum Difficulty of a Job Schedule", "company": "Google", "link": "https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/", "intuition": "DP + greedy splits", "difficulty": "Hard" },
  { "name": "Edit Distance", "company": "Facebook", "link": "https://leetcode.com/problems/edit-distance/", "intuition": "DP greedy alignment", "difficulty": "Hard" },
  { "name": "Smallest Sufficient Team", "company": "Amazon", "link": "https://leetcode.com/problems/smallest-sufficient-team/", "intuition": "Bitmask + greedy", "difficulty": "Hard" },
  { "name": "Split Array Largest Sum", "company": "Google", "link": "https://leetcode.com/problems/split-array-largest-sum/", "intuition": "Binary search", "difficulty": "Hard" },
  { "name": "Maximize Score After N Operations", "company": "Facebook", "link": "https://leetcode.com/problems/maximize-score-after-n-operations/", "intuition": "DP + greedy", "difficulty": "Hard" },
  { "name": "Hard Scheduling Problem (Extra)", "company": "Amazon", "link": "https://leetcode.com/problemset/all/", "intuition": "Greedy + DP", "difficulty": "Hard" }
],
  
Tree :[
  // 🟩 Easy
  { name: "Maximum Depth of Binary Tree", company: "Amazon", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", intuition: "DFS recursion", difficulty: "Easy" },
  { name: "Symmetric Tree", company: "Google", link: "https://leetcode.com/problems/symmetric-tree/", intuition: "Recursion or queue", difficulty: "Easy" },
  { name: "Path Sum", company: "Facebook", link: "https://leetcode.com/problems/path-sum/", intuition: "Recursion down tree", difficulty: "Easy" },
  { name: "Invert Binary Tree", company: "Amazon", link: "https://leetcode.com/problems/invert-binary-tree/", intuition: "Swap children recursively", difficulty: "Easy" },
  { name: "Convert Sorted Array to BST", company: "Google", link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", intuition: "Middle element as root", difficulty: "Easy" },
  { name: "Minimum Depth of Binary Tree", company: "Facebook", link: "https://leetcode.com/problems/minimum-depth-of-binary-tree/", intuition: "BFS or DFS", difficulty: "Easy" },
  { name: "Same Tree", company: "Amazon", link: "https://leetcode.com/problems/same-tree/", intuition: "Recursion", difficulty: "Easy" },
  { name: "Range Sum of BST", company: "Google", link: "https://leetcode.com/problems/range-sum-of-bst/", intuition: "DFS with range check", difficulty: "Easy" },
  { name: "Merge Two Binary Trees", company: "Facebook", link: "https://leetcode.com/problems/merge-two-binary-trees/", intuition: "DFS add values", difficulty: "Easy" },
  { name: "Count Good Nodes in Binary Tree", company: "Amazon", link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", intuition: "DFS with max so far", difficulty: "Easy" },

  // 🟧 Medium
  { name: "Binary Tree Level Order Traversal", company: "Amazon", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", intuition: "BFS with queue", difficulty: "Medium" },
  { name: "Binary Tree Right Side View", company: "Google", link: "https://leetcode.com/problems/binary-tree-right-side-view/", intuition: "BFS or DFS right-first", difficulty: "Medium" },
  { name: "Lowest Common Ancestor of BST", company: "Facebook", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", intuition: "Use BST property", difficulty: "Medium" },
  { name: "Validate Binary Search Tree", company: "Amazon", link: "https://leetcode.com/problems/validate-binary-search-tree/", intuition: "Min/max bounds", difficulty: "Medium" },
  { name: "Construct Binary Tree from Preorder and Inorder", company: "Google", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", intuition: "Recursion split arrays", difficulty: "Medium" },
  { name: "Kth Smallest Element in a BST", company: "Facebook", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", intuition: "Inorder traversal", difficulty: "Medium" },
  { name: "Sum Root to Leaf Numbers", company: "Amazon", link: "https://leetcode.com/problems/sum-root-to-leaf-numbers/", intuition: "DFS carry number", difficulty: "Medium" },
  { name: "Diameter of Binary Tree", company: "Google", link: "https://leetcode.com/problems/diameter-of-binary-tree/", intuition: "DFS height + max path", difficulty: "Medium" },
  { name: "Flatten Binary Tree to Linked List", company: "Facebook", link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", intuition: "Reverse post-order", difficulty: "Medium" },
  { name: "Populating Next Right Pointers", company: "Amazon", link: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/", intuition: "BFS level connection", difficulty: "Medium" },
  { name: "Binary Tree Zigzag Level Order Traversal", company: "Google", link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", intuition: "BFS + level alternation", difficulty: "Medium" },
  { name: "Recover Binary Search Tree", company: "Facebook", link: "https://leetcode.com/problems/recover-binary-search-tree/", intuition: "Inorder detect swap", difficulty: "Medium" },
  { name: "House Robber III", company: "Amazon", link: "https://leetcode.com/problems/house-robber-iii/", intuition: "DP on tree", difficulty: "Medium" },
  { name: "Binary Tree Paths", company: "Google", link: "https://leetcode.com/problems/binary-tree-paths/", intuition: "DFS with path building", difficulty: "Medium" },
  { name: "Path Sum II", company: "Facebook", link: "https://leetcode.com/problems/path-sum-ii/", intuition: "DFS collect paths", difficulty: "Medium" },
  { name: "BST Iterator", company: "Amazon", link: "https://leetcode.com/problems/binary-search-tree-iterator/", intuition: "Stack with inorder", difficulty: "Medium" },
  { name: "Construct BST from Preorder", company: "Google", link: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", intuition: "Recursion with bounds", difficulty: "Medium" },
  { name: "Subtree of Another Tree", company: "Facebook", link: "https://leetcode.com/problems/subtree-of-another-tree/", intuition: "DFS compare trees", difficulty: "Medium" },
  { name: "Maximum Binary Tree", company: "Amazon", link: "https://leetcode.com/problems/maximum-binary-tree/", intuition: "Recursion on max", difficulty: "Medium" },
  { name: "Smallest Subtree with All Deepest Nodes", company: "Google", link: "https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/", intuition: "DFS with depth", difficulty: "Medium" },

  // 🟥 Hard
  { name: "Serialize and Deserialize Binary Tree", company: "Amazon", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", intuition: "BFS/DFS encode tree", difficulty: "Hard" },
  { name: "Binary Tree Maximum Path Sum", company: "Google", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", intuition: "DFS max gain", difficulty: "Hard" },
  { name: "Recover Binary Search Tree", company: "Facebook", link: "https://leetcode.com/problems/recover-binary-search-tree/", intuition: "Inorder misplaced swap", difficulty: "Hard" },
  { name: "Closest Binary Search Tree Value II", company: "Amazon", link: "https://leetcode.com/problems/closest-binary-search-tree-value-ii/", intuition: "Inorder + two pointers", difficulty: "Hard" },
  { name: "Count of Smaller Numbers After Self", company: "Google", link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", intuition: "BST insert with count", difficulty: "Hard" },
  { name: "Vertical Order Traversal", company: "Facebook", link: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", intuition: "BFS + sort", difficulty: "Hard" },
  { name: "All Nodes Distance K in Binary Tree", company: "Amazon", link: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/", intuition: "Parent tracking + BFS", difficulty: "Hard" },
  { name: "Find Duplicate Subtrees", company: "Google", link: "https://leetcode.com/problems/find-duplicate-subtrees/", intuition: "Serialization + map", difficulty: "Hard" },
  { name: "Sum of Distances in Tree", company: "Facebook", link: "https://leetcode.com/problems/sum-of-distances-in-tree/", intuition: "Tree DP", difficulty: "Hard" },
  { name: "Maximum Width of Binary Tree", company: "Amazon", link: "https://leetcode.com/problems/maximum-width-of-binary-tree/", intuition: "BFS with indices", difficulty: "Hard" },
],
Graph: [
  // 🟩 Easy
  { name: "Number of Islands", company: "Amazon", link: "https://leetcode.com/problems/number-of-islands/", intuition: "BFS/DFS count components", difficulty: "Easy" },
  { name: "Flood Fill", company: "Google", link: "https://leetcode.com/problems/flood-fill/", intuition: "DFS/BFS fill color", difficulty: "Easy" },
  { name: "Max Area of Island", company: "Facebook", link: "https://leetcode.com/problems/max-area-of-island/", intuition: "DFS area count", difficulty: "Easy" },
  { name: "Island Perimeter", company: "Amazon", link: "https://leetcode.com/problems/island-perimeter/", intuition: "DFS edge counting", difficulty: "Easy" },
  { name: "Graph Valid Tree", company: "Google", link: "https://leetcode.com/problems/graph-valid-tree/", intuition: "Union-Find / DFS cycle check", difficulty: "Easy" },
  { name: "Find Center of Star Graph", company: "Facebook", link: "https://leetcode.com/problems/find-center-of-star-graph/", intuition: "Star node repeats", difficulty: "Easy" },
  { name: "Find if Path Exists in Graph", company: "Amazon", link: "https://leetcode.com/problems/find-if-path-exists-in-graph/", intuition: "BFS/DFS", difficulty: "Easy" },
  { name: "Count Connected Components", company: "Google", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", intuition: "Union-Find / DFS", difficulty: "Easy" },
  { name: "Find the Town Judge", company: "Facebook", link: "https://leetcode.com/problems/find-the-town-judge/", intuition: "In-degree / Out-degree", difficulty: "Easy" },
  { name: "Clone Graph", company: "Amazon", link: "https://leetcode.com/problems/clone-graph/", intuition: "BFS/DFS with hashmap", difficulty: "Easy" },

  // 🟧 Medium
  { name: "Course Schedule", company: "Amazon", link: "https://leetcode.com/problems/course-schedule/", intuition: "Topo sort cycle detect", difficulty: "Medium" },
  { name: "Rotting Oranges", company: "Google", link: "https://leetcode.com/problems/rotting-oranges/", intuition: "BFS multi-source", difficulty: "Medium" },
  { name: "Pacific Atlantic Water Flow", company: "Facebook", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/", intuition: "Reverse DFS/BFS", difficulty: "Medium" },
  { name: "Number of Enclaves", company: "Amazon", link: "https://leetcode.com/problems/number-of-enclaves/", intuition: "DFS from border", difficulty: "Medium" },
  { name: "Surrounded Regions", company: "Google", link: "https://leetcode.com/problems/surrounded-regions/", intuition: "DFS from border", difficulty: "Medium" },
  { name: "Accounts Merge", company: "Facebook", link: "https://leetcode.com/problems/accounts-merge/", intuition: "Union-Find on emails", difficulty: "Medium" },
  { name: "Evaluate Division", company: "Amazon", link: "https://leetcode.com/problems/evaluate-division/", intuition: "Graph with weights", difficulty: "Medium" },
  { name: "Minimum Height Trees", company: "Google", link: "https://leetcode.com/problems/minimum-height-trees/", intuition: "Topo sort trimming", difficulty: "Medium" },
  { name: "Reconstruct Itinerary", company: "Facebook", link: "https://leetcode.com/problems/reconstruct-itinerary/", intuition: "Hierholzer’s algo", difficulty: "Medium" },
  { name: "Redundant Connection", company: "Amazon", link: "https://leetcode.com/problems/redundant-connection/", intuition: "Union-Find cycle", difficulty: "Medium" },
  { name: "All Paths from Source to Target", company: "Google", link: "https://leetcode.com/problems/all-paths-from-source-to-target/", intuition: "DFS path enumeration", difficulty: "Medium" },
  { name: "Course Schedule II", company: "Facebook", link: "https://leetcode.com/problems/course-schedule-ii/", intuition: "Topo sort result", difficulty: "Medium" },
  { name: "Word Ladder", company: "Amazon", link: "https://leetcode.com/problems/word-ladder/", intuition: "BFS word graph", difficulty: "Medium" },
  { name: "Possible Bipartition", company: "Google", link: "https://leetcode.com/problems/possible-bipartition/", intuition: "BFS 2-color", difficulty: "Medium" },
  { name: "Number of Connected Components in Graph", company: "Facebook", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", intuition: "DFS / Union-Find", difficulty: "Medium" },
  { name: "Number of Operations to Make Network Connected", company: "Amazon", link: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/", intuition: "Union-Find", difficulty: "Medium" },
  { name: "Word Ladder II", company: "Google", link: "https://leetcode.com/problems/word-ladder-ii/", intuition: "BFS + backtracking", difficulty: "Medium" },
  { name: "Cheapest Flights Within K Stops", company: "Facebook", link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", intuition: "BFS with cost tracking", difficulty: "Medium" },
  { name: "Count Sub Islands", company: "Amazon", link: "https://leetcode.com/problems/count-sub-islands/", intuition: "DFS", difficulty: "Medium" },
  { name: "Network Delay Time", company: "Google", link: "https://leetcode.com/problems/network-delay-time/", intuition: "Dijkstra’s Algo", difficulty: "Medium" },

  // 🟥 Hard
  { name: "Alien Dictionary", company: "Amazon", link: "https://leetcode.com/problems/alien-dictionary/", intuition: "Topo sort", difficulty: "Hard" },
  { name: "Word Ladder II", company: "Google", link: "https://leetcode.com/problems/word-ladder-ii/", intuition: "BFS + backtracking", difficulty: "Hard" },
  { name: "Minimum Number of Refueling Stops", company: "Facebook", link: "https://leetcode.com/problems/minimum-number-of-refueling-stops/", intuition: "Max heap on fuel", difficulty: "Hard" },
  { name: "Find Critical and Pseudo-Critical Edges", company: "Amazon", link: "https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/", intuition: "Kruskal’s MST", difficulty: "Hard" },
  { name: "Swim in Rising Water", company: "Google", link: "https://leetcode.com/problems/swim-in-rising-water/", intuition: "Dijkstra / BFS", difficulty: "Hard" },
  { name: "Shortest Path in a Grid with Obstacles Elimination", company: "Facebook", link: "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/", intuition: "BFS with state", difficulty: "Hard" },
  { name: "Parallel Courses", company: "Amazon", link: "https://leetcode.com/problems/parallel-courses/", intuition: "Topo sort with depth", difficulty: "Hard" },
  { name: "Cracking the Safe", company: "Google", link: "https://leetcode.com/problems/cracking-the-safe/", intuition: "Eulerian path", difficulty: "Hard" },
  { name: "The Maze II", company: "Facebook", link: "https://leetcode.com/problems/the-maze-ii/", intuition: "Dijkstra in maze", difficulty: "Hard" },
  { name: "Largest Component Size by Common Factor", company: "Amazon", link: "https://leetcode.com/problems/largest-component-size-by-common-factor/", intuition: "Union-Find", difficulty: "Hard" },
],
Tries:[
  // 🟩 Easy
  { name: "Implement Trie (Prefix Tree)", company: "Amazon", link: "https://leetcode.com/problems/implement-trie-prefix-tree/", intuition: "Basic Trie insert/search", difficulty: "Easy" },
  { name: "Prefix and Suffix Search", company: "Google", link: "https://leetcode.com/problems/prefix-and-suffix-search/", intuition: "Trie with modifications", difficulty: "Easy" },
  { name: "Replace Words", company: "Facebook", link: "https://leetcode.com/problems/replace-words/", intuition: "Trie for dictionary replace", difficulty: "Easy" },
  { name: "Search Suggestions System", company: "Amazon", link: "https://leetcode.com/problems/search-suggestions-system/", intuition: "Trie with DFS suggestions", difficulty: "Easy" },
  { name: "Longest Common Prefix", company: "Google", link: "https://leetcode.com/problems/longest-common-prefix/", intuition: "Vertical scanning", difficulty: "Easy" },
  { name: "Short Encoding of Words", company: "Facebook", link: "https://leetcode.com/problems/short-encoding-of-words/", intuition: "Trie reverse words", difficulty: "Easy" },
  { name: "Add and Search Word - Data Structure Design", company: "Amazon", link: "https://leetcode.com/problems/add-and-search-word-data-structure-design/", intuition: "Trie with '.' support", difficulty: "Easy" },
  { name: "Map Sum Pairs", company: "Google", link: "https://leetcode.com/problems/map-sum-pairs/", intuition: "Trie with sum tracking", difficulty: "Easy" },
  { name: "Design Add and Search Words Data Structure", company: "Facebook", link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", intuition: "Trie with DFS for '.'", difficulty: "Easy" },
  { name: "Check If a String Contains All Binary Codes of Size K", company: "Amazon", link: "https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/", intuition: "Trie/hashset tracking", difficulty: "Easy" },

  // 🟧 Medium
  { name: "Word Search II", company: "Amazon", link: "https://leetcode.com/problems/word-search-ii/", intuition: "Trie + DFS on board", difficulty: "Medium" },
  { name: "Implement Magic Dictionary", company: "Google", link: "https://leetcode.com/problems/implement-magic-dictionary/", intuition: "Trie with search variant", difficulty: "Medium" },
  { name: "Longest Word in Dictionary", company: "Facebook", link: "https://leetcode.com/problems/longest-word-in-dictionary/", intuition: "Trie + BFS", difficulty: "Medium" },
  { name: "Index Pairs of a String", company: "Amazon", link: "https://leetcode.com/problems/index-pairs-of-a-string/", intuition: "Trie to find substrings", difficulty: "Medium" },
  { name: "Camelcase Matching", company: "Google", link: "https://leetcode.com/problems/camelcase-matching/", intuition: "Trie with pattern", difficulty: "Medium" },
  { name: "Replace Words", company: "Facebook", link: "https://leetcode.com/problems/replace-words/", intuition: "Trie for replacement", difficulty: "Medium" },
  { name: "Power of Two Integers", company: "Amazon", link: "https://leetcode.com/problems/repeated-string-match/", intuition: "Prefix matching", difficulty: "Medium" },
  { name: "Palindrome Pairs", company: "Google", link: "https://leetcode.com/problems/palindrome-pairs/", intuition: "Trie reverse + check", difficulty: "Medium" },
  { name: "Concatenated Words", company: "Facebook", link: "https://leetcode.com/problems/concatenated-words/", intuition: "Trie + DFS memo", difficulty: "Medium" },
  { name: "Stream of Characters", company: "Amazon", link: "https://leetcode.com/problems/stream-of-characters/", intuition: "Trie reversed", difficulty: "Medium" },
  { name: "Design Search Autocomplete System", company: "Google", link: "https://leetcode.com/problems/design-search-autocomplete-system/", intuition: "Trie + hashmap counts", difficulty: "Medium" },
  { name: "Word Squares", company: "Facebook", link: "https://leetcode.com/problems/word-squares/", intuition: "Trie with backtracking", difficulty: "Medium" },
  { name: "Add and Search Word - DS Design", company: "Amazon", link: "https://leetcode.com/problems/add-and-search-word-data-structure-design/", intuition: "Trie with '.' support", difficulty: "Medium" },
  { name: "Sum of Prefix Scores of Strings", company: "Google", link: "https://leetcode.com/problems/sum-of-prefix-scores-of-strings/", intuition: "Trie prefix sum", difficulty: "Medium" },
  { name: "Maximum XOR of Two Numbers in an Array", company: "Facebook", link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", intuition: "Trie with bits", difficulty: "Medium" },
  { name: "Maximum XOR With an Element From Array", company: "Amazon", link: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", intuition: "Trie with queries", difficulty: "Medium" },
  { name: "Binary Tree Longest Consecutive Sequence", company: "Google", link: "https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/", intuition: "DFS with path", difficulty: "Medium" },
  { name: "Lexicographical Numbers", company: "Facebook", link: "https://leetcode.com/problems/lexicographical-numbers/", intuition: "DFS tree", difficulty: "Medium" },
  { name: "Restore IP Addresses", company: "Amazon", link: "https://leetcode.com/problems/restore-ip-addresses/", intuition: "Backtracking", difficulty: "Medium" },
  { name: "Count Distinct Substrings", company: "Google", link: "https://leetcode.com/problems/distinct-subsequences/", intuition: "Trie based counting", difficulty: "Medium" },

  // 🟥 Hard
  { name: "Hard Word Search II", company: "Amazon", link: "https://leetcode.com/problems/word-search-ii/", intuition: "Trie + backtracking", difficulty: "Hard" },
  { name: "Palindrome Pairs", company: "Google", link: "https://leetcode.com/problems/palindrome-pairs/", intuition: "Trie reversed", difficulty: "Hard" },
  { name: "Stream of Characters", company: "Facebook", link: "https://leetcode.com/problems/stream-of-characters/", intuition: "Reversed Trie", difficulty: "Hard" },
  { name: "Design Search Autocomplete System", company: "Amazon", link: "https://leetcode.com/problems/design-search-autocomplete-system/", intuition: "Trie + hashmap", difficulty: "Hard" },
  { name: "Maximum XOR of Two Numbers", company: "Google", link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", intuition: "Trie bitwise", difficulty: "Hard" },
  { name: "Maximum XOR With Element", company: "Facebook", link: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", intuition: "Trie + queries", difficulty: "Hard" },
  { name: "Concatenated Words", company: "Amazon", link: "https://leetcode.com/problems/concatenated-words/", intuition: "Trie + DFS memo", difficulty: "Hard" },
  { name: "Word Squares", company: "Google", link: "https://leetcode.com/problems/word-squares/", intuition: "Trie + backtracking", difficulty: "Hard" },
  { name: "Index Pairs of a String", company: "Facebook", link: "https://leetcode.com/problems/index-pairs-of-a-string/", intuition: "Trie find substrings", difficulty: "Hard" },
  { name: "Hard Longest Duplicate Substring", company: "Amazon", link: "https://leetcode.com/problems/longest-duplicate-substring/", intuition: "Trie + binary search", difficulty: "Hard" }
],
MathAndBitManipulation : [
  // 🟩 Easy
  { name: "Count Primes", company: "Amazon", link: "https://leetcode.com/problems/count-primes/", intuition: "Sieve of Eratosthenes", difficulty: "Easy" },
  { name: "Power of Two", company: "Google", link: "https://leetcode.com/problems/power-of-two/", intuition: "n & (n-1) == 0", difficulty: "Easy" },
  { name: "Reverse Bits", company: "Facebook", link: "https://leetcode.com/problems/reverse-bits/", intuition: "Bit by bit reversal", difficulty: "Easy" },
  { name: "Hamming Distance", company: "Amazon", link: "https://leetcode.com/problems/hamming-distance/", intuition: "Count set bits in XOR", difficulty: "Easy" },
  { name: "Number of 1 Bits", company: "Google", link: "https://leetcode.com/problems/number-of-1-bits/", intuition: "Brian Kernighan’s algo", difficulty: "Easy" },
  { name: "Sum of Two Integers", company: "Facebook", link: "https://leetcode.com/problems/sum-of-two-integers/", intuition: "Bit manipulation addition", difficulty: "Easy" },
  { name: "Missing Number", company: "Amazon", link: "https://leetcode.com/problems/missing-number/", intuition: "XOR from 0..n", difficulty: "Easy" },
  { name: "Add Digits", company: "Google", link: "https://leetcode.com/problems/add-digits/", intuition: "Digital root", difficulty: "Easy" },
  { name: "Excel Sheet Column Number", company: "Facebook", link: "https://leetcode.com/problems/excel-sheet-column-number/", intuition: "Base conversion", difficulty: "Easy" },
  { name: "Happy Number", company: "Amazon", link: "https://leetcode.com/problems/happy-number/", intuition: "Cycle detection", difficulty: "Easy" },

  // 🟧 Medium
  { name: "Single Number II", company: "Google", link: "https://leetcode.com/problems/single-number-ii/", intuition: "Bit count per position", difficulty: "Medium" },
  { name: "Sum of Two Integers", company: "Facebook", link: "https://leetcode.com/problems/sum-of-two-integers/", intuition: "Bitwise addition", difficulty: "Medium" },
  { name: "Maximum Product of Word Lengths", company: "Amazon", link: "https://leetcode.com/problems/maximum-product-of-word-lengths/", intuition: "Bitmask for char set", difficulty: "Medium" },
  { name: "Counting Bits", company: "Google", link: "https://leetcode.com/problems/counting-bits/", intuition: "DP on bits", difficulty: "Medium" },
  { name: "Bitwise AND of Numbers Range", company: "Facebook", link: "https://leetcode.com/problems/bitwise-and-of-numbers-range/", intuition: "Common prefix", difficulty: "Medium" },
  { name: "Power of Four", company: "Amazon", link: "https://leetcode.com/problems/power-of-four/", intuition: "Bitmask check", difficulty: "Medium" },
  { name: "Single Number III", company: "Google", link: "https://leetcode.com/problems/single-number-iii/", intuition: "XOR partition", difficulty: "Medium" },
  { name: "Divide Two Integers", company: "Facebook", link: "https://leetcode.com/problems/divide-two-integers/", intuition: "Bit shifting subtraction", difficulty: "Medium" },
  { name: "Factorial Trailing Zeroes", company: "Amazon", link: "https://leetcode.com/problems/factorial-trailing-zeroes/", intuition: "Count 5 factors", difficulty: "Medium" },
  { name: "Sqrt(x)", company: "Google", link: "https://leetcode.com/problems/sqrtx/", intuition: "Binary search", difficulty: "Medium" },
  { name: "Integer to Roman", company: "Facebook", link: "https://leetcode.com/problems/integer-to-roman/", intuition: "Greedy subtract", difficulty: "Medium" },
  { name: "Roman to Integer", company: "Amazon", link: "https://leetcode.com/problems/roman-to-integer/", intuition: "Mapping", difficulty: "Medium" },
  { name: "Multiply Strings", company: "Google", link: "https://leetcode.com/problems/multiply-strings/", intuition: "Simulate multiplication", difficulty: "Medium" },
  { name: "Subsets", company: "Facebook", link: "https://leetcode.com/problems/subsets/", intuition: "Bitmask subsets", difficulty: "Medium" },
  { name: "Gray Code", company: "Amazon", link: "https://leetcode.com/problems/gray-code/", intuition: "i ^ (i >> 1)", difficulty: "Medium" },
  { name: "Number of Digit One", company: "Google", link: "https://leetcode.com/problems/number-of-digit-one/", intuition: "Count 1s in position", difficulty: "Medium" },
  { name: "Maximum XOR of Two Numbers in an Array", company: "Facebook", link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", intuition: "Trie/greedy XOR", difficulty: "Medium" },
  { name: "Decode Ways", company: "Amazon", link: "https://leetcode.com/problems/decode-ways/", intuition: "DP with string parse", difficulty: "Medium" },
  { name: "Add Binary", company: "Google", link: "https://leetcode.com/problems/add-binary/", intuition: "Simulate binary add", difficulty: "Medium" },
  { name: "Valid Perfect Square", company: "Facebook", link: "https://leetcode.com/problems/valid-perfect-square/", intuition: "Binary search", difficulty: "Medium" },

  // 🟥 Hard
  { name: "Basic Calculator", company: "Amazon", link: "https://leetcode.com/problems/basic-calculator/", intuition: "Stack, sign handling", difficulty: "Hard" },
  { name: "Basic Calculator II", company: "Google", link: "https://leetcode.com/problems/basic-calculator-ii/", intuition: "Stack, precedence", difficulty: "Hard" },
  { name: "Expression Add Operators", company: "Facebook", link: "https://leetcode.com/problems/expression-add-operators/", intuition: "DFS + eval", difficulty: "Hard" },
  { name: "Maximum XOR With an Element From Array", company: "Amazon", link: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", intuition: "Trie with queries", difficulty: "Hard" },
  { name: "Trapping Rain Water", company: "Google", link: "https://leetcode.com/problems/trapping-rain-water/", intuition: "Two pointers", difficulty: "Hard" },
  { name: "Reverse Pairs", company: "Facebook", link: "https://leetcode.com/problems/reverse-pairs/", intuition: "Merge sort counting", difficulty: "Hard" },
  { name: "Count of Smaller Numbers After Self", company: "Amazon", link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", intuition: "BIT / merge sort", difficulty: "Hard" },
  { name: "Maximum Sum of Two Non-Overlapping Subarrays", company: "Google", link: "https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/", intuition: "DP + prefix sums", difficulty: "Hard" },
  { name: "Largest Rectangle in Histogram", company: "Facebook", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", intuition: "Stack", difficulty: "Hard" },
  { name: "Largest Rectangle in Matrix", company: "Amazon", link: "https://leetcode.com/problems/maximal-rectangle/", intuition: "Histogram stack", difficulty: "Hard" }
],
LongestSubstringVariations: [
  {
    "name": "Longest Substring Without Repeating Characters",
    "company": "Amazon",
    "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "intuition": "Sliding window, hashset",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Substring with At Most K Distinct Characters",
    "company": "Google",
    "link": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
    "intuition": "Sliding window, hashmap",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Repeating Character Replacement",
    "company": "Facebook",
    "link": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "intuition": "Sliding window, freq count",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Substring with At Most Two Distinct Characters",
    "company": "Amazon",
    "link": "https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/",
    "intuition": "Sliding window, 2 distinct",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Substring with At Least K Repeating Characters",
    "company": "Google",
    "link": "https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/",
    "intuition": "Divide and conquer",
    "difficulty": "Hard"
  },
  {
    "name": "Longest Substring After Character Replacement",
    "company": "Facebook",
    "link": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "intuition": "Similar to replace to make valid",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Continuous Subarray with Absolute Diff Less Than or Equal to Limit",
    "company": "Amazon",
    "link": "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/",
    "intuition": "Sliding window + deque",
    "difficulty": "Hard"
  },
  {
    "name": "Longest Well-Performing Interval",
    "company": "Google",
    "link": "https://leetcode.com/problems/longest-well-performing-interval/",
    "intuition": "Prefix sum + hashmap",
    "difficulty": "Hard"
  },
  {
    "name": "Longest Turbulent Subarray",
    "company": "Facebook",
    "link": "https://leetcode.com/problems/longest-turbulent-subarray/",
    "intuition": "Sliding window on sign changes",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Mountain in Array",
    "company": "Amazon",
    "link": "https://leetcode.com/problems/longest-mountain-in-array/",
    "intuition": "Two pointers peak check",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Palindromic Substring",
    "company": "Google",
    "link": "https://leetcode.com/problems/longest-palindromic-substring/",
    "intuition": "Expand around center",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Palindrome",
    "company": "Facebook",
    "link": "https://leetcode.com/problems/longest-palindrome/",
    "intuition": "Count freq for palindrome",
    "difficulty": "Easy"
  },
  {
    "name": "Longest Consecutive Sequence",
    "company": "Amazon",
    "link": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "intuition": "HashSet linear scan",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Subarray of 1's After Deleting One Element",
    "company": "Google",
    "link": "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/",
    "intuition": "Sliding window of zeros",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Nice Substring",
    "company": "Facebook",
    "link": "https://leetcode.com/problems/longest-nice-substring/",
    "intuition": "Divide and conquer",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Increasing Subsequence",
    "company": "Amazon",
    "link": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "intuition": "DP with binary search",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Duplicate Substring",
    "company": "Google",
    "link": "https://leetcode.com/problems/longest-duplicate-substring/",
    "intuition": "Binary search + Rolling hash",
    "difficulty": "Hard"
  },
  {
    "name": "Longest Happy Prefix",
    "company": "Facebook",
    "link": "https://leetcode.com/problems/longest-happy-prefix/",
    "intuition": "KMP preprocessing",
    "difficulty": "Hard"
  },
  {
    "name": "Longest Substring Without Repeating Characters (Follow-up: Streaming)",
    "company": "Amazon",
    "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "intuition": "Sliding window adapt",
    "difficulty": "Medium"
  },
  {
    "name": "Longest Repeating Substring",
    "company": "Google",
    "link": "https://leetcode.com/problems/longest-repeating-substring/",
    "intuition": "Binary search + HashSet",
    "difficulty": "Medium"
  }
],

  
};

const badgeColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "badge bg-success";
    case "Medium":
      return "badge bg-warning text-dark";
    case "Hard":
      return "badge bg-danger";
    default:
      return "badge bg-secondary";
  }
};

function App() {
  const [selectedSection, setSelectedSection] = useState("Arrays");
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) fetchProgress(session.user.id);
      else loadLocal();
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProgress(session.user.id);
      else loadLocal();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const loadLocal = () => {
    const saved = JSON.parse(localStorage.getItem("dsa-progress") || "{}");
    setProgress(saved);
  };

  const fetchProgress = async (user_id) => {
    const { data: existing } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", user_id)
      .single();
    if (existing) {
      setProgress(existing.data);
      localStorage.setItem("dsa-progress", JSON.stringify(existing.data));
    } else {
      setProgress({});
    }
  };

  const saveProgress = async () => {
    if (!user) {
      toast.error("Login to save online.");
      return;
    }
    const { data: existing } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (existing) {
      await supabase.from("progress").update({ data: progress }).eq("user_id", user.id);
    } else {
      await supabase.from("progress").insert({ user_id: user.id, data: progress });
    }
    toast.success("Progress saved online!");
  };

  const handleCheckboxChange = (section, idx) => {
    const updated = { ...progress, [`${section}-${idx}`]: !progress[`${section}-${idx}`] };
    setProgress(updated);
    localStorage.setItem("dsa-progress", JSON.stringify(updated));
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "dsa-progress.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        setProgress(imported);
        localStorage.setItem("dsa-progress", JSON.stringify(imported));
        toast.success("Progress imported!");
      } catch {
        toast.error("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset progress?")) {
      setProgress({});
      localStorage.removeItem("dsa-progress");
      toast.info("Progress reset.");
    }
  };

  const signInWithEmail = async () => {
    const email = prompt("Enter your email for login/signup:");
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        toast.error("Error sending login link.");
      } else {
        setShowModal(true);
        toast.success("Login link sent! Check your email.");
      }
    } catch {
      toast.error("Unexpected error during login.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    loadLocal();
    toast.info("Logged out.");
  };

  return (
    <div className="container py-4 position-relative">
      <ToastContainer position="top-center" autoClose={3000} />
      <motion.h1
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🚀 DSA Tracker
      </motion.h1>

      {/* 🟩 Auth Buttons */}
      <div className="text-center mb-2">
        {user ? (
          <>
            <span className="me-2">👋 {user.email}</span>
            <button className="btn btn-sm btn-danger" onClick={signOut}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn btn-sm btn-success"
            onClick={signInWithEmail}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Sending...
              </>
            ) : (
              "Login / Signup"
            )}
          </button>
        )}
      </div>

      {/* 🟩 Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Check Your Email</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                A login link has been sent to your email. Click it to complete login.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🟩 Save / Reset Controls */}
      <div className="text-center mb-3">
        <button className="btn btn-outline-primary btn-sm mx-1" onClick={saveProgress}>
          ☁️ Save Online
        </button>
        <button className="btn btn-outline-danger btn-sm mx-1" onClick={handleReset}>
          🔄 Reset Progress
        </button>
        <button className="btn btn-outline-secondary btn-sm mx-1" onClick={handleExport}>
          💾 Export Progress
        </button>
        <button
          className="btn btn-outline-secondary btn-sm mx-1"
          onClick={() => inputRef.current.click()}
        >
          📂 Import Progress
        </button>
        <input
          type="file"
          accept=".json"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleImport}
        />
      </div>

      {/* 🔻 Section Selector */}
      <div className="dropdown mb-4 text-center">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedSection}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {Object.keys(data).map((section) => (
            <li key={section}>
              <button className="dropdown-item" onClick={() => setSelectedSection(section)}>
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔻 Table */}
      <div className="table-responsive">
        <AnimatePresence mode="wait">
          <motion.table
            key={selectedSection}
            className="table table-striped table-bordered align-middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <thead className="table-dark">
              <tr>
                <th>✅</th>
                <th>📝 Problem</th>
                <th>🏢 Company</th>
                <th>🔗 Link</th>
                <th>💡 Intuition</th>
                <th>⭐ Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {data[selectedSection].map((problem, idx) => (
                <motion.tr key={idx} whileHover={{ scale: 1.02 }}>
                  <td>
                    <input
                      type="checkbox"
                      checked={progress[`${selectedSection}-${idx}`] || false}
                      onChange={() => handleCheckboxChange(selectedSection, idx)}
                    />
                  </td>
                  <td>{problem.name}</td>
                  <td>{problem.company}</td>
                  <td>
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary"
                    >
                      LeetCode
                    </a>
                  </td>
                  <td>{problem.intuition}</td>
                  <td>
                    <motion.span whileHover={{ scale: 1.1 }} className={badgeColor(problem.difficulty)}>
                      {problem.difficulty}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;