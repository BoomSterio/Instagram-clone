import { ProfilePicture } from "components"
import { StyleSheet, ScrollView, View, Text } from "react-native"
import { User } from "types"

interface UserInfoProps {
  userInfo: User | null
}

export const UserInfo = ({userInfo}: UserInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <ProfilePicture diameter={95} imageUrl={userInfo?.profilePicture} />
        <View style={styles.statistics}>
          <View style={styles.statItem}>
            <Text style={styles.boldText}>0</Text>
            <Text style={{color: 'white'}}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.boldText}>0</Text>
            <Text style={{color: 'white'}}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.boldText}>0</Text>
            <Text style={{color: 'white'}}>Following</Text>
          </View>
        </View>
      </View>
      <Text style={styles.username}>{userInfo?.name}</Text>
      <Text style={{color: 'white'}}>{userInfo?.bio}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statistics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 32,
    flex: 1
  },
  statItem: {
    alignItems: 'center'
  },
  boldText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  username: {
    color: 'white',
    fontWeight: '700',
    marginTop: 10,
  },
})