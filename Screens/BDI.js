import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { FIREBASE_DB } from '../FirebaseConfig'
import {ref, set} from 'firebase/database'
import PickerComponent from '../Components/PickerComponent'
import BdiResult from '../Components/BdiResult'
import Required from '../Components/Required'

const bdi = {
    howSad:[
        {
            answer:'0 I do not feel sad',
            id: 0
        },
        {
            answer:'1 I feel sad',
            id: 1
        },
        {
            answer: "2 I am sad all the time and I can't snap out of it.",
            id: 2
        },
        {
            answer: "3 I am so sad and unhappy that I can't stand it",
            id: 3
        }
    ],
    aboutFuture: [
        {
            answer: "0 I am not particularly discouraged about the future.",
            id: 0
        },
        {
            answer: "1 I feel discouraged about the future.",
            id: 1
        },
        {
            answer: "2 I feel I have nothing to look forward to.",
            id: 2
        },
        {
            answer: "3 I feel the future is hopeless and that things cannot improve.",
            id: 3
        }
    ],
    failure: [
        {
            answer: "0 I do not feel like a failure.",
            id: 0
        },
        {
            answer: "1 I feel I have failed more than the average person.",
            id: 1
        },
        {
            answer: "2 As I look back on my life, all I can see is a lot of failures.", 
            id: 2
        },
        {
            answer: "3 I feel I am a complete failure as a person.",
            id: 3
        }
    ],
    satisfaction: [
        {
            answer: "0 I get as much satisfaction out of things as I used to.",
            id: 0
        },
        {
            answer: "1 I don't enjoy things the way I used to.",
            id: 1
        },
        {
            answer: "2 I don't get real satisfaction out of anything anymore.",
            id: 2
        },
        {
            answer: "3 I am dissatisfied or bored with everything.",
            id: 3
        }
    ],
    quilty: [
        {
            answer: "0 I don't feel particularly guilty",
            id: 0
        },
        {
            answer: "1 I feel guilty a good part of the time.",
            id: 1
        },
        {
            answer: "2 I feel quite guilty most of the time",
            id: 2
        },
        {
            answer: "3 I feel guilty all of the time.",
            id: 3
        }
    ],
    punish: [
        {
            answer: "0 I don't feel I am being punished.",
            id: 0
        },
        {
            answer: "1 I feel I may be punished.",
            id: 1
        },
        {
            answer: "2 I expect to be punished.",
            id: 2
        },
        {
            answer: "3 I feel I am being punished.",
            id: 3
        }
    ],
    disappointment: [
        {
            answer: "0 I don't feel disappointed in myself.",
            id: 0
        },
        {
            answer: "1 I am disappointed in myself.",
            id: 1
        },
        {
            answer: "2 I am disgusted with myself.",
            id: 2
        },
        {
            answer: "3 I hate myself.",
            id: 3
        }
    ],
    myself: [
        {
            answer: "0 I don't feel I am any worse than anybody else.",
            id: 0
        },
        {
            answer: "1 I am critical of myself for my weaknesses or mistakes.",
            id: 1
        },
        {
            answer: "2 I blame myself all the time for my faults.",
            id: 2
        },
        {
            answer: "3 I blame myself for everything bad that happens.",
            id: 3
        }        
    ],
    selfHarm: [
        {
            answer: "0 I don't have any thoughts of killing myself.",
            id: 0
        },
        {
            answer: "1 I have thoughts of killing myself, but I would not carry them out.",
            id: 1
        },
        {
            answer: "2 I would like to kill myself",
            id: 2
        },
        {
            answer: "3 I would kill myself if I had the chance",
            id: 3
        }  
    ],
    cry: [
        {
            answer: "0 I don't cry any more than usual.",
            id: 0
        },
        {
            answer: "1 I cry more now than I used to",
            id: 1
        },
        {
            answer: "2 I cry all the time now",
            id: 2
        },
        {
            answer: "3 I used to be able to cry, but now I can't cry even though I want to.",
            id: 3
        }  
    ],
    irritation: [
        {
            answer: "0 I am no more irritated by things than I ever was",
            id: 0
        },
        {
            answer: "1 I am slightly more irritated now than usual.",
            id: 1
        },
        {
            answer: "2 I am quite annoyed or irritated a good deal of the time.",
            id: 2
        },
        {
            answer: "3 I feel irritated all the time.",
            id: 3
        }
    ],
    interest: [
        {
            answer: "0 I have not lost interest in other people.",
            id: 0
        },
        {
            answer: "1 I am less interested in other people than I used to be.",
            id: 1
        },
        {
            answer: "2 I have lost most of my interest in other people.",
            id: 2
        },
        {
            answer: "3 I have lost all of my interest in other people.",
            id: 3
        }
    ],
    decisions: [
        {
            answer: "0 I make decisions about as well as I ever could.",
            id: 0
        },
        {
            answer: "1 I put off making decisions more than I used to.",
            id: 1
        },
        {
            answer: "2 I have greater difficulty in making decisions more than I used to.",
            id: 2
        },
        {
            answer: "3 I can't make decisions at all anymore.",
            id: 3
        }
    ],
    looks: [
        {
            answer: "0 I don't feel that I look any worse than I used to.",
            id: 0
        },
        {
            answer: "1 I am worried that I am looking old or unattractive.",
            id: 1
        },
        {
            answer: "2 I feel there are permanent changes in my appearance that make me look unattractive.",
            id: 2
        },
        {
            answer: "3 I believe that I look ugly",
            id: 3
        }
    ],
    work: [
        {
            answer: "0 I can work about as well as before. ",
            id: 0
        },
        {
            answer: "1 It takes an extra effort to get started at doing something.",
            id: 1
        },
        {
            answer: "2 I have to push myself very hard to do anything.",
            id: 2
        },
        {
            answer: "3 I can't do any work at all.",
            id: 3
        }
    ],
    sleep: [
        {
            answer: "0 I can sleep as well as usual.",
            id: 0
        },
        {
            answer: "1 I don't sleep as well as I used to",
            id: 1
        },
        {
            answer: "2 I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.",
            id: 2
        },
        {
            answer: "3 I wake up several hours earlier than I used to and cannot get back to sleep",
            id: 3
        }
    ],
    tired: [
        {
            answer: "0 I don't get more tired than usual.",
            id: 0
        },
        {
            answer: "1 I get tired more easily than I used to.",
            id: 1
        },
        {
            answer: "2 I get tired from doing almost anything.",
            id: 2
        },
        {
            answer: "3 I am too tired to do anything.",
            id: 3
        }
    ],
    appetite: [
        {
            answer: "0 My appetite is no worse than usual",
            id: 0
        },
        {
            answer: "1 My appetite is not as good as it used to be",
            id: 1
        },
        {
            answer: "2 My appetite is much worse now.",
            id: 2
        },
        {
            answer: "3 I have no appetite at all anymore",
            id: 3
        }
    ],
    weight: [
        {
            answer: "0 I haven't lost much weight, if any, lately.",
            id: 0
        },
        {
            answer: "1 I have lost more than 2,5 kg.",
            id: 1
        },
        {
            answer: "2 I have lost more than 5 kg.",
            id: 2
        },
        {
            answer: "3 I have lost more than 7,5 kg.",
            id: 3
        }
    ],
    health: [
        {
            answer: "0 I am no more worried about my health than usual",
            id: 0
        },
        {
            answer: "1 I am worried about physical problems like aches, pains, upset stomach, or constipation.",
            id: 1
        },
        {
            answer: "2 I am very worried about physical problems and it's hard to think of much else.",
            id: 2
        },
        {
            answer: "3 I am so worried about my physical problems that I cannot think of anything else.",
            id: 3
        }
    ],
    sexuality: [
        {
            answer: "0 I have not noticed any recent change in my interest in sex.",
            id: 0
        },
        {
            answer: "1 I am less interested in sex than I used to be.",
            id: 1
        },
        {
            answer: "2 I have almost no interest in sex.",
            id: 2
        },
        {
            answer: "3 I have lost interest in sex completely.",
            id: 3
        }
    ]


}

const BDI = ({route}) => {
    const [sadness, setSadness] = useState(0);
    const [future, setFuture] = useState(0);
    const [failure, setFailure] = useState(0);
    const [satisfaction, setSatisfaction] = useState(0);
    const [quilty, setQuilty] = useState(0)
    const [punish, setPunish] = useState(0)
    const [disappointment, setDisappointment] = useState(0);
    const [myself, setMyself] = useState(0);
    const [selfHarm, setSelfHarm] = useState(0);
    const [cry, setCry] = useState(0);
    const [irritation, setIrritation] = useState(0);
    const [interest, setInterest] = useState(0);
    const [decisions, setDecisions] = useState(0);
    const [looks, setLooks] = useState(0);
    const [work, setWork] = useState(0);
    const [sleep, setSleep] = useState(0);
    const [tired, setTired] = useState(0);
    const [appetite, setAppetite] = useState(0);
    const [weight, setWeight] = useState(0);
    const [health, setHealth] = useState(0);
    const [sexuality, setSexuality] = useState(0);

    const handleSexuality = (itemValue) =>{
        setSexuality(itemValue)
    }  

    const handleHealth = (itemValue) =>{
        setHealth(itemValue)
    }  

    const handleWeight = (itemValue) =>{
        setWeight(itemValue)
    }  

    const handleAppetite = (itemValue) =>{
        setAppetite(itemValue)
    }    

    const handleTired = (itemValue) =>{
        setTired(itemValue)
    }

    const handleSleep = (itemValue) =>{
        setSleep(itemValue)
    }

    const handleWork = (itemValue) =>{
        setWork(itemValue)
    }

    const handleLooks = (itemValue) =>{
        setLooks(itemValue)
    }

    const handleDecisions = (itemValue) =>{
        setDecisions(itemValue)
    }

    const handleInterest = (itemValue) =>{
        setInterest(itemValue)
    }

    const handleIrritation = (itemValue) =>{
        setIrritation(itemValue)
    }

    const handleCry = (itemValue) =>{
        setCry(itemValue)
    }

    const handleSelfHarm = (itemValue) =>{
        setSelfHarm(itemValue)
    }

    const handleMyself = (itemValue) =>{
        setMyself(itemValue)
    }

    const handleDisappoinment = (itemValue) =>{
        setDisappointment(itemValue)
    }

    const handleSadnessChange = (itemValue) => {
        setSadness(itemValue)
    }

    const handleFutureChange = (itemValue) => {
        setFuture(itemValue)
    }
    
    const handleFailureChange = (itemValue) => {
        setFailure(itemValue)
    }

    const handleSatisfactionChange = (itemValue) => {
        setSatisfaction(itemValue)
    }

    const handleQuiltyChange = (itemValue) => {
        setQuilty(itemValue)
    }
    
    const handlePunishChange = (itemValue) => {
        setPunish(itemValue)
    }

    const {userId} = route.params

    const sum = sadness + future + failure + satisfaction + quilty + punish + disappointment + myself + selfHarm + cry + irritation + interest + decisions + looks + work + sleep + tired + appetite + weight + health + sexuality
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const currentDate = date + '' + month + '' + year

    const handlePress = () => {
        set(ref(FIREBASE_DB, 'users/' + userId + '/bdi/'),
        {
            date: currentDate,
            1: sadness,
            2: future,
            3: failure,
            4: satisfaction,
            5: quilty,
            6: punish,
            7: disappointment,
            8: myself,
            9: selfHarm,
            10: cry,
            11: irritation,
            12: interest,
            13: decisions,
            14: looks,
            15: work,
            16: sleep,
            17: tired,
            18: appetite,
            19: weight,
            20: health,
            21: sexuality,
            bdi: sum,          

        })
    }
    

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.textStyle}>Select option that most accurately from every dropdown menu</Text>
        <PickerComponent selectedValue={sadness} onChange={handleSadnessChange} data={bdi.howSad}/>
        <PickerComponent selectedValue={future} onChange={handleFutureChange} data={bdi.aboutFuture}/>
        <PickerComponent selectedValue={failure} onChange={handleFailureChange} data={bdi.failure}/>
        <PickerComponent selectedValue={satisfaction} onChange={handleSatisfactionChange} data={bdi.satisfaction}/>
        <PickerComponent selectedValue={quilty} onChange={handleQuiltyChange} data={bdi.quilty}/>
        <PickerComponent selectedValue={punish} onChange={handlePunishChange} data={bdi.punish}/>
        <PickerComponent selectedValue={disappointment} onChange={handleDisappoinment} data={bdi.disappointment}/>
        <PickerComponent selectedValue={myself} onChange={handleMyself} data={bdi.myself}/>
        <PickerComponent selectedValue={selfHarm} onChange={handleSelfHarm} data={bdi.selfHarm}/>
        <PickerComponent selectedValue={cry} onChange={handleCry} data={bdi.cry}/>
        <PickerComponent selectedValue={irritation} onChange={handleIrritation} data={bdi.irritation}/>
        <PickerComponent selectedValue={interest} onChange={handleInterest} data={bdi.interest}/>
        <PickerComponent selectedValue={decisions} onChange={handleDecisions} data={bdi.decisions}/>
        <PickerComponent selectedValue={looks} onChange={handleLooks} data={bdi.looks}/>
        <PickerComponent selectedValue={work} onChange={handleWork} data={bdi.work}/>
        <PickerComponent selectedValue={sleep} onChange={handleSleep} data={bdi.sleep}/>
        <PickerComponent selectedValue={tired} onChange={handleTired} data={bdi.tired}/>
        <PickerComponent selectedValue={appetite} onChange={handleAppetite} data={bdi.appetite}/>
        <PickerComponent selectedValue={weight} onChange={handleWeight} data={bdi.weight}/>
        <PickerComponent selectedValue={health} onChange={handleHealth} data={bdi.health}/>
        <PickerComponent selectedValue={sexuality} onChange={handleSexuality} data={bdi.sexuality}/>    
        <Required onPress={handlePress} name='Save' />
        <BdiResult sum={sum}/>
    </ScrollView>
  )
}

export default BDI

const styles = StyleSheet.create({
   
    container: {
        backgroundColor: '#d4edf6',
        height: '100%',
        paddingHorizontal: 10
    },
    textStyle: {
        fontSize: 20,
        padding: 10
    }
})