import { useState, useEffect } from 'react';

const useStreak = () => {
    const [streakCount, setStreakCount] = useState(0);
    const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

    const getStreak = () => {
        const streakDates = JSON.parse(localStorage.getItem('streakDates')) || [];
        let count = 0;
        const today = new Date();

        // Sort streakDates in descending order to make sure we start from the most recent date
        streakDates.sort((a, b) => new Date(b) - new Date(a));

        // Loop over sorted streakDates starting with the most recent
        for (let i = 0; i < streakDates.length; i++) {
            const streakDate = new Date(streakDates[i]);
            const diffTime = Math.abs(today - streakDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Check if the streakDate is either today or exactly 1 day before the previous streak date
            if ((i === 0 && diffDays === 0) || (diffDays === 1)) {
                count++;
                // Set 'today' to the current streakDate so the next iteration can check for a consecutive day
                today.setDate(today.getDate() - 1);
            } else {
                // If days are not consecutive, break the loop
                break;
            }
        }

        console.log(`Current streak count: ${count}`);

        setStreakCount(count);
    };

    const checkUserInForDailyCheckin = () => {
        const streakDates = JSON.parse(localStorage.getItem('streakDates')) || [];
        const today = new Date().toISOString().split('T')[0];

        // if user has already checked in today, do nothing
        if (hasCheckedInToday || streakDates[streakDates.length - 1] === today) {
            
            return;
        }

        streakDates.push(today);
        localStorage.setItem('streakDates', JSON.stringify(streakDates));

        getStreak();
        setHasCheckedInToday(true);
    };

    useEffect(() => {
        getStreak();
    }, []);

    return { streakCount, checkUserInForDailyCheckin, hasCheckedInToday };
};

export default useStreak;
