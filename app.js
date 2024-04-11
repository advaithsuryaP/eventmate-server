const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE, OPTIONS'
	);
	next();
});

app.post('/api/events', (req, res, next) => {
	const event = req.body;
	res.status(201).json({
		message: 'Event created successfully.',
	});
});

app.get('/api/events', (req, res, next) => {
	const events = [
		{
			_id: 'event1',
			image: 'https://picsum.photos/id/1025/400/300', // Replace with your image URL
			title: 'Tech Innovation Summit 2024',
			description:
				'Join us for a day of inspiring talks, workshops, and networking opportunities with industry leaders in technology innovation.',
			domain: {
				_id: 'domain1',
				name: 'Technology',
				description:
					'Events related to technology advancements, innovations, and developments.',
				interests: [
					'Artificial Intelligence',
					'Cybersecurity',
					'Software Development',
					'Cloud Computing',
					'Data Science',
					'Blockchain',
				],
				rank: 1,
			}, // Reference the ID from your Domain data
			location: 'San Francisco, CA',
			date: '2024-05-15',
			startTime: '10:00 AM',
			endTime: '05:00 PM',
			attendees: [],
		},
		{
			_id: 'event2',
			image: 'https://picsum.photos/id/203/400/300', // Replace with your image URL
			title: 'Mastering Public Speaking for Professionals',
			description:
				'Develop your confidence and communication skills to deliver impactful presentations in any setting.',
			domain: {
				_id: 'domain2',
				name: 'Business',
				description:
					'Business-related events including conferences, seminars, and workshops.',
				interests: [
					'Marketing',
					'Finance',
					'Entrepreneurship',
					'Leadership',
					'Management',
					'Project Management',
				],
				rank: 2,
			}, // Reference the ID from your Domain data
			location: 'Chicago, IL',
			date: '2024-05-20',
			startTime: '10:00 AM',
			endTime: '04:00 PM',
			attendees: [],
		},
		{
			_id: 'event3',
			image: 'https://picsum.photos/id/847/400/300', // Replace with your image URL
			title: 'Art Exhibition: Modern Masters',
			description:
				'Explore a collection of artworks by renowned contemporary artists, showcasing diverse styles and techniques.',
			domain: {
				_id: 'domain3',
				name: 'Art',
				description:
					'Art exhibitions, galleries, and cultural events showcasing visual arts.',
				interests: [
					'Painting',
					'Sculpture',
					'Photography',
					'Film',
					'Music',
					'Design',
				],
				rank: 3,
			}, // Reference the ID from your Domain data
			location: 'New York City, NY',
			date: '2024-06-01',
			startTime: '10:00 AM',
			endTime: '06:00 PM',
			attendees: [],
		},
		{
			_id: 'event4',
			image: 'https://picsum.photos/id/1074/400/300', // Replace with your image URL
			title: 'Women in Tech Panel Discussion',
			description:
				'Hear from inspiring female leaders in the tech industry as they share their career journeys and insights.',
			domain: {
				_id: 'domain1',
				name: 'Technology',
				description:
					'Events related to technology advancements, innovations, and developments.',
				interests: [
					'Artificial Intelligence',
					'Cybersecurity',
					'Software Development',
					'Cloud Computing',
					'Data Science',
					'Blockchain',
				],
				rank: 1,
			}, // Reference the ID from your Domain data
			location: 'Seattle, WA',
			date: '2024-07-12',
			startTime: '06:30 PM',
			endTime: '08:30 PM',
			attendees: [],
		},
		{
			_id: 'event5',
			image: 'https://picsum.photos/id/204/400/300', // Replace with your image URL
			title: 'Creative Writing Workshop: Fiction Fundamentals',
			description:
				'Unlock your creativity and explore the basics of storytelling in a supportive and inspiring environment.',
			domain: {
				_id: 'domain3',
				name: 'Art',
				description:
					'Art exhibitions, galleries, and cultural events showcasing visual arts.',
				interests: [
					'Painting',
					'Sculpture',
					'Photography',
					'Film',
					'Music',
					'Design',
				],
				rank: 3,
			}, // Reference the ID from your Domain data
			location: 'Austin, TX',
			date: '2024-08-10',
			startTime: '01:00 PM',
			endTime: '05:00 PM',
			attendees: [],
		},
		{
			_id: 'event6',
			image: 'https://picsum.photos/id/739/400/300', // Replace with your image URL
			title: 'Design Thinking Workshop',
			description:
				'Learn the fundamentals of design thinking and apply them to solve real-world challenges in a collaborative environment.',
			domain: {
				_id: 'domain2',
				name: 'Business',
				description:
					'Business-related events including conferences, seminars, and workshops.',
				interests: [
					'Marketing',
					'Finance',
					'Entrepreneurship',
					'Leadership',
					'Management',
					'Project Management',
				],
				rank: 2,
			}, // Reference the ID from your Domain data
			location: 'Los Angeles, CA',
			date: '2024-04-20', // This event has already passed
			startTime: '09:00 AM',
			endTime: '04:00 PM',
			attendees: [],
		},
	];

	res.status(200).json({
		message: 'Events fetched successfully.',
		data: events,
	});
});

app.get('/api/domains', (req, res, next) => {
	const domains = [
		{
			_id: 'domain1',
			name: 'Technology',
			description:
				'Events related to technology advancements, innovations, and developments.',
			interests: [
				'Artificial Intelligence',
				'Cybersecurity',
				'Software Development',
				'Cloud Computing',
				'Data Science',
				'Blockchain',
			],
			rank: 1,
		},
		{
			_id: 'domain2',
			name: 'Business',
			description:
				'Business-related events including conferences, seminars, and workshops.',
			interests: [
				'Marketing',
				'Finance',
				'Entrepreneurship',
				'Leadership',
				'Management',
				'Project Management',
			],
			rank: 2,
		},
		{
			_id: 'domain3',
			name: 'Art',
			description:
				'Art exhibitions, galleries, and cultural events showcasing visual arts.',
			interests: [
				'Painting',
				'Sculpture',
				'Photography',
				'Film',
				'Music',
				'Design',
			],
			rank: 3,
		},
	];
	res.status(200).json({
		message: 'Domains fetched successfully.',
		data: domains,
	});
});

const port = process.env.PORT || 3000;

mongoose
	.connect(
		'mongodb+srv://advaith:qrlE9EyIBQgDdtpj@seng-645.dxkzx73.mongodb.net/?retryWrites=true&w=majority&appName=seng-645'
	)
	.then((result) => {
		console.log('Connected to database!');
		app.listen(port);
	})
	.catch((err) => {
		console.log('Error connecting to database');
	});
