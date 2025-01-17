import { Button, Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Row } from "./Row";
import useThemeColors from "@/hooks/useThemeColors";
import { useRef, useState } from "react";
import ThemedText from "./ThemedText";
import Card from "./Card";
import Radio from "./Radio";


type Props = {
    value: "id" | "name",
    onChange: (s: "id" | "name") => void
};

const options = 
[
    {label: "Numéro", value: "id"},
    {label: "Nom", value: "name"}
] as const

export function SortButton({ value, onChange }: Props) {
    const colors = useThemeColors();
    const [isModal, setModalVisible] = useState(false);
    const buttonRef = useRef<View>(null);
    const [position,setPosition] = useState<null | {
        top:Number;
        right:Number;
    }>(null);

    const onButtonPressed = () => {
        buttonRef.current?.measureInWindow((x,y,width,height) => {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width - x -width
            })
            setModalVisible(true);
        })
    }

    return (
        <>
        <Pressable onPress={onButtonPressed}>
        <View  ref={buttonRef} style={[styles.button, { backgroundColor: colors.grayWhite }]}>
        <Image 
        source = {
            value === "id" ? 
            require("@/assets/images/tag.png") : 
            require("@/assets/images/a.png")
        }
        width={16}
        height={16}
        />
        </View>
        </Pressable>

        <Modal animationType="fade" transparent visible={isModal} onRequestClose={() => setModalVisible(false)}>
            <Pressable style={styles.backgrop} onPress={() => setModalVisible(false)} />
            <View style={[styles.popup, {backgroundColor: colors.tint,}]}>
                <ThemedText style={styles.title} variant="subtitle3" color="grayWhite">Trier par:</ThemedText>
                <Card style={styles.card}>
                {
                    options.map((p) => (
                        <Pressable key={p.value} onPress={() => onChange(p.value) }> 
                            <Row  gap={8}>
                        <Radio checked={p.value === value} />
                        <ThemedText>{p.label}</ThemedText>
                    </Row>
                        </Pressable>
                    ))
                }
                </Card>
            </View>
        </Modal>
        </>
    );


}

{/* <Row gap={8}>
            <Text>Sort by:</Text>
            <Button onPress={ () => onChange("id") } title="ID" />
            <Button onPress={() => onChange("name")} title="Name" />
        </Row> */}
const styles = StyleSheet.create({
    button: {
        width:32,
        height:32,
        borderRadius:32,
        flex:0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgrop : {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    popup:{
        padding:4,
        paddingTop:32,
        gap:16,
        borderRadius:12,
        //  position: 'absolute',
        // width:113
    },
    title:{
        paddingLeft:20
    },
    card : {
        paddingVertical:16,
        paddingHorizontal:20,
        gap:16
    }
})