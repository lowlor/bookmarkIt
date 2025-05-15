import {StyleSheet,BackHandler,View, Text ,TextInput,Pressable,Image, Alert}  from 'react-native'

const PressableRipple  = ({children ,onPress, style, radius,wide,margin,auto}) =>{
    const styles = styleSheet(radius,wide,margin,auto)
    return (
        <View style={styles.container}>
            <Pressable
                android_ripple={{
                    color: '#111',
                    borderless: false,
                    radius: undefined,
                    foreground: true
                }}
                style={style} onPress={onPress}>
                {children}
            </Pressable>
        </View>
        
    )
}

export default PressableRipple;

const styleSheet = (radius,wide,margin) => {
    return StyleSheet.create({
    container : {
        borderRadius: radius,
        overflow: 'hidden',
        alignItems: 'center',
        width: wide,
        marginLeft : margin[3],
        marginTop: margin[0],
       
    },
    
})

}