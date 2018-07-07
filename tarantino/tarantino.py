import csv
from pydub import AudioSegment
from pydub.playback import play


"""
a sonification project about tarantinos big death scenes and how we enjoy them. The project focuses on 3 of his movies: kill bill 1, inglourious basterds and django unchained. However, this code should be able to represent anyother movie shown in the original data. 
a giggle will represent a curse word and laughter represents a kill.
"""

WORD_TUPLE = 0
TIME_TUPLE = 1

MOVIE_NAME_INDEX = 0
TYPE_INDEX = 1
WORD_INDEX = 2
TIME_INDEX = 3

#
# with open('tarantino_data_all.csv', 'rb') as file:
#     reader = csv.reader(file)
#     movie_dict = {}
#     for row in reader:
#         # need to split data per movie, using a dictionary containing matrixes
#         # kill bill: [(word min), (word min), (word min)]
#
#         if row[MOVIE_NAME_INDEX] not in movie_dict.keys():
#             movie_dict[row[MOVIE_NAME_INDEX]] = []
#
#         # row looks like: movie | death/word | theword | time
#         if row[TYPE_INDEX] == 'death':
#             movie_dict[row[MOVIE_NAME_INDEX]].append(('death', row[TIME_INDEX]))
#         else:
#             movie_dict[row[MOVIE_NAME_INDEX]].append((row[WORD_INDEX], row[TIME_INDEX]))


    # print movie_dict


with open('tarantino_data_kill_bill.csv', 'rb') as file:
    reader = csv.reader(file)
    kill_bill_arr = []
    # index of array * 5 is the num of mins

    rownum = 0
    time = 0
    for row in reader:
        # need to split data per movie, using a dictionary containing matrixes
        # kill bill: [(word min), (word min), (word min)]
        if rownum == 0:
            # skips the first two line
            rownum+=1
        else:
            time += 5
            while time != int(row[0]) and time < int(row[0]):
                kill_bill_arr.append((0, 0))
                time += 5
            # adds a tuple of (num_of_death, num_of_curse)
            kill_bill_arr.append((row[1], row[2]))
            rownum += 1


    print kill_bill_arr

# with open('tarantino_data_django.csv', 'rb') as file:
#     reader = csv.reader(file)
#     django_arr = []
#     # index of array * 5 is the num of mins
#
#     rownum = 0
#     time = 0
#     for row in reader:
#         # need to split data per movie, using a dictionary containing matrixes
#         # kill bill: [(word min), (word min), (word min)]
#         if rownum == 0:
#             # skips the first two line
#             rownum+=1
#         else:
#             time += 5
#             while time != int(row[0]) and time < int(row[0]):
#                 django_arr.append((0, 0))
#                 time += 5
#             # adds a tuple of (num_of_death, num_of_curse)
#             django_arr.append([row[1], row[2]])
#             rownum += 1
#
#
#     print django_arr

# with open('tarantino_data_basterds.csv', 'rb') as file:
#     reader = csv.reader(file)
#     basterds_arr = []
#     # index of array * 5 is the num of mins
#
#     rownum = 0
#     time = 0
#     for row in reader:
#         # need to split data per movie, using a dictionary containing matrixes
#         # kill bill: [(word min), (word min), (word min)]
#         if rownum == 0:
#             # skips the first two line
#             rownum+=1
#         else:
#             time += 5
#             while time != int(row[0]) and time < int(row[0]):
#                 basterds_arr.append([0, 0])
#                 time += 5
#             # adds a tuple of (num_of_death, num_of_curse)
#             basterds_arr.append([row[1], row[2]])
#             rownum += 1
#
#
#     print basterds_arr

laugh_s_audio = AudioSegment.from_file(
    "/Users/laurescemama/PycharmProjects/tarantino/sounds/small_laugh.wav", format="wav")
laugh_m_audio = AudioSegment.from_file(
    "/Users/laurescemama/PycharmProjects/tarantino/sounds/medium_laugh.wav", format="wav")
laugh_l_audio = AudioSegment.from_file(
    "/Users/laurescemama/PycharmProjects/tarantino/sounds/big_laugh.wav", format="wav")
laugh_xl_audio = AudioSegment.from_file(
    "/Users/laurescemama/PycharmProjects/tarantino/sounds/huge_laugh.wav", format="wav")
silence_audio = AudioSegment.from_file(
    "/Users/laurescemama/PycharmProjects/tarantino/sounds/silence.wav", format="wav")

sound_of_data = silence_audio[:1]
time_of_data = []

for index, item in enumerate(kill_bill_arr):
    if (item[0] == ''):
        item = (0, item[1])
    if (item[1] == ''):
        item = (item[0], 0)

    num_of_death = int(item[0])
    num_of_curse = int(item[1])

    if num_of_death==0 and num_of_curse==0:
        # play(silence_audio)
        time_of_data.append(len(sound_of_data))
        sound_of_data += silence_audio

    elif (num_of_death < 5 and num_of_death>0):  # if
        # play(laugh_m_audio)
        time_of_data.append(len(sound_of_data))
        sound_of_data += (laugh_m_audio + num_of_death)
        # line of red

    elif (num_of_death >5 and num_of_death<14):
        # play(laugh_l_audio)
        time_of_data.append(len(sound_of_data))
        sound_of_data += laugh_l_audio + num_of_death


        # lots of lines
    elif (num_of_death >= 14):
        # play(laugh_xl_audio)
        time_of_data.append(len(sound_of_data))

        sound_of_data += laugh_xl_audio + 20
        # whole screen red

    elif num_of_curse < 14 and num_of_curse>0:  #if
        time_of_data.append(len(sound_of_data))

        # play(laugh_s_audio)
        sound_of_data += laugh_s_audio - 20

        # draw yellow line
    elif num_of_curse >= 14:
        # play(laugh_m_audio)
        time_of_data.append(len(sound_of_data))

        sound_of_data += laugh_m_audio - 10

        # draw liness
sound_of_data.export("killbill_datasound3.wav", format="wav")
print time_of_data
# print django_arr


# todo: find smaller laugh and keep tweeking the audio



 # if death: then laugh and red
# else: gigle and yellow according to length of the curse
#
#
# for item in basterds_arr:
#     if (item[0] == ''):
#         item = (0, item[1])
#     if (item[1] == ''):
#         item = (item[0], 0)
#
#     num_of_death = int(item[0])
#     num_of_curse = int(item[1])
#
#     if num_of_death==0 and num_of_curse==0:
#         # play(silence_audio)
#         sound_of_data += silence_audio
#
#     elif (num_of_death < 5 and num_of_death>0):  # if
#         # play(laugh_m_audio)
#         sound_of_data += laugh_m_audio
#         # line of red
#
#     elif (num_of_death >5 and num_of_death<14):
#         # play(laugh_l_audio)
#         sound_of_data += laugh_l_audio
#
#         # lots of lines
#     elif (num_of_death >= 14):
#         # play(laugh_xl_audio)
#         sound_of_data += laugh_xl_audio + 3
#         # whole screen red
#
#     elif num_of_curse < 14 and num_of_curse>0:  #if
#         # play(laugh_s_audio)
#         sound_of_data += laugh_s_audio
#
#         # draw yellow line
#     elif num_of_curse >= 14:
#         # play(laugh_m_audio)
#         sound_of_data += laugh_m_audio
#
#         # draw liness
# sound_of_data.export("basterds_datasound.wav", format="wav")



# todo:
# option 1
#     control volume in python, and do graphics of amplitude in p5
# option 2
#     transfer the data to sound to p5 instead of python