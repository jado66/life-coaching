import { useState, useEffect } from 'react';
import { useUser } from './use-user';

const useStreak = () => {
    const [streakCount, setStreakCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

    const {user, streakDates, updateUserByKey} = useUser();

    const setStreakDates = (streakDates) => {
        updateUserByKey('streakDates', streakDates);
    }

    const getStreak = () => {
        let count = 0;
        const today = new Date();

        if (!streakDates){
            console.log('No streak dates found. User:',JSON.stringify(user));
            return
        }
        // Sort streakDates in descending order to make sure we start from the most recent date
        streakDates.sort((a, b) => new Date(b) - new Date(a));

        if(streakDates[streakDates.length - 1] === today.toISOString().split('T')[0]){
            setHasCheckedInToday(true);
        }

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
        setLoading(false);
    };

    const checkUserInForDailyCheckin = () => {
        const today = new Date().toISOString().split('T')[0];

        // if user has already checked in today, do nothing
        if (hasCheckedInToday || streakDates[streakDates.length - 1] === today) {
            return;
        }

        streakDates.push(today);
        setStreakDates(streakDates)

        // Update streak count
        setStreakCount(streakCount + 1);
        setHasCheckedInToday(true);
    };

    useEffect(() => {
        if (user !== null){
            console.log('useStreak - User', user);
            getStreak();
        }
    }, [user]);

    return { streakCount, checkUserInForDailyCheckin, loading, hasCheckedInToday };
};

export default useStreak;
