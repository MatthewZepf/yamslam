from chips import Chips

class Board:
    def __init__(self):
        # need to initalize chips and players
        # for chips initialize 4 chips of each of the following values: 5, 10, 20, 25, 30, 40, 50
        self.chips = [Chips(5), Chips(10), Chips(20), Chips(25), Chips(30), Chips(40), Chips(50)]
    
    def reset(self):
        # reset the board to the initial state
        pass

    def set_players(self, players):
        # set the players
        pass
    
    def get_chip_options(self, dice):
        # return the possible chip options for the current dice
        ans = []
        # convert dice from strings to ints
        dice = [int(i) for i in dice]
        dice = sorted(dice)
        dice_set = set(dice)

        if (len(dice_set) == 1):
            # YAMSLAMM
            # append all chips in the board
            ans = self.chips
        
        elif (len(dice_set) == 2):
            # 4 of a kind or full house
            if (dice[0] == dice[1] and dice[2] == dice[3]):
                ans.append(self.chips[5])
            else:
                ans.append(self.chips[4])
        
        elif (len(dice_set) == 3):
            # 3 of a kind or 2 pairs
            if (dice[0] == dice[1] and dice[1] == dice[2]):
                ans.append(self.chips[1])
            elif (dice[1] == dice[2] and dice[2] == dice[3]):
                ans.append(self.chips[1])
            else:
                ans.append(self.chips[0])
        
        elif (len(dice_set) == 4):
            # small straight or nothing (dice will always be 5 you can't check if its equal to a set of 4)
            consecutive_count = 0
            for num, index in enumerate(dice):
                # check if we have 4 consecutive numbers, if so append the chip
                if (consecutive_count >= 4):
                    ans.append(self.chips[2])
                    break

                if (index == dice[num + 1] - 1):
                    consecutive_count += 1
                else:
                    consecutive_count = 0
        
        elif (len(dice_set) == 5):
            # large straight or small straight or nothing
            consecutive_count = 0
            for num, index in enumerate(dice):

                if (consecutive_count >= 5):
                    ans.append(self.chips[6])
                
                if (consecutive_count >= 4):
                    ans.append(self.chips[2])
                    break

                if (index == dice[num + 1] - 1):
                    consecutive_count += 1
                else:
                    consecutive_count = 0
        
        # check if it's all odd or all even if so append chips[3]
        odd_count = 0
        even_count = 0
        for num in dice:
            if (num % 2 == 0):
                even_count += 1
            else:
                odd_count += 1
        
        if (odd_count == 5 or even_count == 5):
            ans.append(self.chips[3])

        # return best option followed by value, i.e. [small straight, 30]
        dict_values = {"5": "two pairs", "10": "three of a kind", "20": "small straight", "25": "flush", "30": "full house", "40": "four of a kind", "50": "large straight", "100": "YAMSLAMM"}
        # return a dict with the highest value and name of that chip
        if (len(ans) == 0):
            return {"value": 0, "name": "nothing"}
        elif ans == self.chips:
            return {"value": 100, "name": "YAMSLAM"}
        max_val = max(chip.val for chip in ans)
        return {"value": max_val, "name": dict_values[str(max_val)]}