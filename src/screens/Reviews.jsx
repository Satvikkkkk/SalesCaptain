import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { colors } from '../utils/colors';
import addReviewIcon from '../assets/addReviewIcon.png';
import { Image } from 'react-native-elements';

const generateRandomReviews = () => {
  const sampleReviews = [
    {
      title: 'Great!',
      details: 'I really enjoyed using this. Highly recommend!',
    },
    {
      title: 'Not bad',
      details: 'could use some improvements.',
    },
    {
      title: 'Excellent Service',
      details: 'Customer service was very responsive and helpful.',
    },
    {
      title: 'Good Value',
      details: 'Good value for the money.',
    },
    {
      title: 'Satisfactory',
      details: 'Meets my expectations.',
    },
  ];

  return sampleReviews;
};

const Reviews = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let storedReviews = JSON.parse(await AsyncStorage.getItem('reviews'));
        if (!storedReviews || storedReviews.length === 0) {
          storedReviews = generateRandomReviews();
          await AsyncStorage.setItem('reviews', JSON.stringify(storedReviews));
        }
        setReviews(storedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [isFocused]); // Refresh when component is focused

  const handleReviewPress = (review) => {
    console.log('Pressed review:', review);
    // Handle review press if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {reviews.length === 0 ? (
          <Text style={styles.noDataText}>No reviews available.</Text>
        ) : (
          reviews.map((review, index) => (
            <TouchableOpacity key={index} onPress={() => handleReviewPress(review)} style={[styles.reviewItem, { backgroundColor: index % 2 === 0 ? colors.gray : colors.white }]}>
              <View style={styles.reviewIcon}>
                <Ionicons name="star-outline" size={40} color={colors.dark} />
              </View>
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewTitle}>{review.title || 'No Title'}</Text>
                <Text style={styles.reviewDetails}>{review.details || 'No Details'}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddReview')}
        >
          <Image source={addReviewIcon} resizeMode='contain' style={{ width: 34, height: 34 }} color={colors.black} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: colors.gray,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderWidth: 20,
    borderColor: colors.secondary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.violet,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark,
    marginBottom: 1,
  },
  reviewIcon: {
    marginRight: 15,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  reviewDetails: {
    fontSize: 14,
    color: colors.grey,
  },
  noDataText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginTop: 20,
  },

  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 150,
    backgroundColor: colors.gray,
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Reviews;
