import { TextInput, View ,Image,StyleSheet} from "react-native"
import { Row } from "./Row"
import useThemeColors from "@/hooks/useThemeColors"


type Props = {
    value: string,
    onChange: (s: string) => void
}

export  default function SearchBar({value, onChange}: Props) {
    const colors = useThemeColors();
    return <Row gap={8} style={[styles.wrapper , {backgroundColor:colors.grayWhite}]}>
        <Image 
        source={require("@/assets/images/search.png")}
        width={12}
        height={12}
        />
    <TextInput onChangeText={onChange} value={value}/>
    </Row>
}

const styles = StyleSheet.create({
    wrapper : {
        flex: 1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal:12
    },
    input: {
        flex: 1,
        fontSize: 10,
        lineHeight:16,
        height: 16,
    }
})