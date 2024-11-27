import React from "react";

const categoryPriority = {
    detected: 1,
    malicious: 1,
    suspicious: 3,
    clean: 4,
    harmless: 4,
    undetected: 5,
    failure: 5,
    "type-unsupported": 5,
}

/**
 * Sorts an array based on the status priority.
 * @param {Array} resultsArray - The array to be sorted.
 * @returns {Array} - The sorted array.
 */

export const sortAnalysisResults = (resultsArray) => {
    return resultsArray.sort(([, a], [, b]) => {
      const priorityA = categoryPriority[a.category] || 5; // Default lowest priority for unknown categories
      const priorityB = categoryPriority[b.category] || 5;
      return priorityA - priorityB;
    });
  };