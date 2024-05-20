-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 21 avr. 2024 à 02:20
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pfeyousef`
--

-- --------------------------------------------------------

--
-- Structure de la table `attributions`
--

CREATE TABLE `attributions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `attributions`
--

INSERT INTO `attributions` (`id`, `student_id`, `formation_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 1, '1', '2024-04-19 18:29:23', '2024-04-19 19:41:05'),
(3, 3, 2, '1', '2024-04-19 19:45:55', '2024-04-19 19:46:06');

-- --------------------------------------------------------

--
-- Structure de la table `certificates`
--

CREATE TABLE `certificates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `certificate` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cour` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `file` varchar(191) NOT NULL,
  `Formation_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `cour`, `description`, `file`, `Formation_id`, `created_at`, `updated_at`) VALUES
(6, 'React router dom', 'first cour', 'graph.pdf', 1, '2024-04-18 16:50:26', '2024-04-18 16:50:26'),
(7, 'instalation laravel', 'Xampp composer', 'oumaima abidi.pdf', 2, '2024-04-19 15:29:24', '2024-04-19 15:29:24');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `formations`
--

CREATE TABLE `formations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL,
  `idEnseignant` bigint(20) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `length` text NOT NULL,
  `price` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formations`
--

INSERT INTO `formations` (`id`, `title`, `idEnseignant`, `description`, `length`, `price`, `created_at`, `updated_at`) VALUES
(1, 'React Js', 2, 'Good formation', '3 weeks', '120dt', '2024-04-17 14:13:01', '2024-04-17 14:13:01'),
(2, 'laravel', 2, 'for the beginner', '1 weeks', '122dt', '2024-04-17 14:49:43', '2024-04-17 14:49:43'),
(3, 'Agile SCRUM', 4, 'for the student', '24h', '50DT', '2024-04-18 12:10:53', '2024-04-18 12:10:53');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(7, '2024_04_13_220529_create__cours_table', 2),
(16, '2014_10_12_000000_create_users_table', 3),
(17, '2014_10_12_100000_create_password_resets_table', 3),
(18, '2019_08_19_000000_create_failed_jobs_table', 3),
(19, '2019_12_14_000001_create_personal_access_tokens_table', 3),
(20, '2023_03_15_231230_add_expires_at_column_to_personal_access_tokens_table', 3),
(21, '2024_04_13_180910_create_formations_table', 3),
(22, '2024_04_17_132735_create_quizzes_table', 3),
(23, '2024_04_17_194248_create_questions_table', 4),
(24, '2024_04_17_194442_create_questions_table', 5),
(25, '2024_04_18_172857_create_cours_table', 6),
(26, '2024_04_19_175942_create_attributions_table', 7),
(27, '2024_04_20_010342_create_certificates_table', 8);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`, `expires_at`) VALUES
(9, 'App\\Models\\User', 3, 'hazem@gmail.com_EtudiantToken', '2cf66dc045c6434886fceff63a5a399042629ce8627c9ed22969a46c38730412', '[\"server:etudiant\"]', '2024-04-18 16:08:21', '2024-04-18 11:00:12', '2024-04-18 16:08:21', NULL),
(16, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', '5fc78ff677cd528eaa561891f2e7488e2818e443b3e1bedf7f2c3792ce8dd60c', '[\"server:enseignant\"]', '2024-04-18 17:22:23', '2024-04-18 14:34:53', '2024-04-18 17:22:23', NULL),
(17, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', '1dda0d2568aa43940928d1e5f1f32fee9f3ac8ef769804ccbce403502cfe772b', '[\"server:enseignant\"]', '2024-04-18 19:46:36', '2024-04-18 18:45:59', '2024-04-18 19:46:36', NULL),
(18, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', '7b188723cb66a04d97e5b5a9dba881fb8c8f6d7e4daa4c6cfd4ae78d4e90d957', '[\"server:enseignant\"]', '2024-04-18 20:34:37', '2024-04-18 19:01:47', '2024-04-18 20:34:37', NULL),
(19, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', '3a4d9568b63de85b91677367c51014152160146c3fc54ee6bf45fc83965d683a', '[\"server:enseignant\"]', '2024-04-18 20:34:39', '2024-04-18 19:56:56', '2024-04-18 20:34:39', NULL),
(20, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', '677a1015544c44edca55e8f41bd1046fe6eb9cbac4b7004dd052967c21cc28df', '[\"server:enseignant\"]', '2024-04-18 21:08:46', '2024-04-18 21:06:02', '2024-04-18 21:08:46', NULL),
(21, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', 'aeb334d6df0766d62b63a741337920b30b43578d0ae98f111ae3b2e0050a5107', '[\"server:enseignant\"]', '2024-04-19 15:29:32', '2024-04-19 15:26:42', '2024-04-19 15:29:32', NULL),
(22, 'App\\Models\\User', 3, 'hazem@gmail.com_EtudiantToken', 'a28b90151cceabed6a2789063e7a4f59eea4e1eb50b08e26a2cd1b232a1d09bb', '[\"server:etudiant\"]', '2024-04-19 15:30:18', '2024-04-19 15:30:14', '2024-04-19 15:30:18', NULL),
(23, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', '008b7cbd7e713e431462e8e872cb4099a3e16752c27d0a61f17dee4d0627937c', '[\"server:enseignant\"]', '2024-04-19 21:04:30', '2024-04-19 15:52:56', '2024-04-19 21:04:30', NULL),
(24, 'App\\Models\\User', 3, 'hazem@gmail.com_EtudiantToken', 'f6bdb0fd7667f5dce598b532f696b3553f9531feca6782a7c1ecb63d6562796e', '[\"server:etudiant\"]', '2024-04-19 19:45:55', '2024-04-19 15:56:18', '2024-04-19 19:45:55', NULL),
(25, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', '4a7a826d0499379f9b3c03c44fe87ee376d2b48fa1ec4775e67bd499478cfbf4', '[\"server:enseignant\"]', '2024-04-19 23:24:51', '2024-04-19 21:58:12', '2024-04-19 23:24:51', NULL),
(26, 'App\\Models\\User', 2, 'rahma@gmail.com_EnseignantToken', 'e578e9c7e4fee7f2026d13a2bbfd8ca9b9f53ed3e3a81ccfa100504fdda3bb18', '[\"server:enseignant\"]', '2024-04-20 14:17:27', '2024-04-20 14:15:31', '2024-04-20 14:17:27', NULL),
(28, 'App\\Models\\User', 3, 'hazem@gmail.com_EtudiantToken', 'a569040666b71ca43ced96e117ae94c666516447776d70e49b9191310259a6b4', '[\"server:etudiant\"]', '2024-04-20 14:24:33', '2024-04-20 14:24:11', '2024-04-20 14:24:33', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Qcm_id` bigint(20) UNSIGNED NOT NULL,
  `question` varchar(191) NOT NULL,
  `answer_options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`answer_options`)),
  `correct_answer` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `Qcm_id`, `question`, `answer_options`, `correct_answer`, `created_at`, `updated_at`) VALUES
(1, 2, 'Q1', '[\"A1\",\"A2\",\"A3\",\"A4\"]', 'A3', '2024-04-17 18:00:55', '2024-04-17 18:00:55'),
(2, 2, 'Q2', '[\"A1\",\"A2\",\"A3\",\"A4\"]', 'A1', '2024-04-17 18:03:17', '2024-04-17 18:03:17'),
(3, 2, 'Q3', '[\"A1\",\"A2\",\"A3\",\"A4\"]', 'A2', '2024-04-17 18:03:38', '2024-04-17 18:03:38'),
(4, 2, 'Q4', '[\"A1\",\"A2\",\"A3\",\"A4\"]', 'A1', '2024-04-17 18:04:13', '2024-04-18 10:24:18'),
(6, 3, 'Q1', '[\"A1\",\"A2\",\"A3\",\"A4\"]', 'A1', '2024-04-18 10:26:01', '2024-04-18 10:26:01'),
(7, 2, 'Q2', '[\"A1\",\"A2\",\"A3\",\"A4\"]', 'A2', '2024-04-18 10:26:24', '2024-04-18 10:26:24'),
(8, 3, 'Q3', '[\"A1\",\"A2\",\"A3\",\"A4\"]', 'A4', '2024-04-18 10:26:51', '2024-04-18 10:26:51'),
(9, 3, 'Q4', '[\"A1\",\"A2\",\"A3\",\"A4\"]', 'A2', '2024-04-18 10:27:10', '2024-04-18 10:27:28');

-- --------------------------------------------------------

--
-- Structure de la table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL,
  `enseignant_id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `expirationDate` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`, `enseignant_id`, `formation_id`, `expirationDate`, `created_at`, `updated_at`) VALUES
(2, 'Qcm 1', 2, 2, '2024-04-17', '2024-04-17 14:32:48', '2024-04-17 17:29:53'),
(3, 'Q1', 2, 2, '2024-04-17', '2024-04-18 10:25:32', '2024-04-18 10:25:32'),
(4, 'QCM 6', 2, 1, '2024-04-18', '2024-04-19 15:28:34', '2024-04-19 15:28:34');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fisrtname` varchar(191) NOT NULL,
  `lastname` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `address` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `fisrtname`, `lastname`, `phone`, `role`, `email`, `email_verified_at`, `password`, `address`, `country`, `image`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'MasterAdmin', '34524365', 'Admin', 'admin@gmail.com', NULL, '$2y$10$RPpbK9IqaG3RFauhc9q7Wu1b39x6azwBXQc7BlrOMGI8OWqxCgavW', 'Moknin', 'Monastir', '1713462141.jpeg', NULL, NULL, '2024-04-18 15:42:21'),
(2, 'rahma', 'Mgannem', '33454387', 'Enseignant', 'rahma@gmail.com', NULL, '$2y$10$mGRvTgk67dKqAMSnLH0snec7dQetT/rUJ87Ns7ifecnWAV2Xs1ENC', NULL, NULL, '1713447889.jpeg', NULL, '2024-04-17 14:08:17', '2024-04-18 11:44:49'),
(3, 'hazem', 'mgannem', '33224455', 'Etudiant', 'hazem@gmail.com', NULL, '$2y$10$B9hbVepAeiGeJcz.dmunQ.NY82HQSHfZr.uY0luhBeS0JNVTZ8gju', NULL, NULL, '1713452089.avif', NULL, '2024-04-18 10:29:19', '2024-04-18 12:54:49'),
(4, 'Sana', 'Sabahi', '23435654', 'Enseignant', 'sana@gmail.com', NULL, '$2y$10$ACD1riHVG54h/0kUu6qhte0tvHwCIsWf3UJ0piA26EffDvC/hb9NC', NULL, NULL, '1713449518.jpg', NULL, '2024-04-18 12:09:44', '2024-04-18 12:11:58');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `attributions`
--
ALTER TABLE `attributions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attributions_student_id_foreign` (`student_id`),
  ADD KEY `attributions_formation_id_foreign` (`formation_id`);

--
-- Index pour la table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `certificates_student_id_foreign` (`student_id`);

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cours_formation_id_foreign` (`Formation_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `formations`
--
ALTER TABLE `formations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formations_idenseignant_foreign` (`idEnseignant`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_qcm_id_foreign` (`Qcm_id`);

--
-- Index pour la table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quizzes_enseignant_id_foreign` (`enseignant_id`),
  ADD KEY `quizzes_formation_id_foreign` (`formation_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `attributions`
--
ALTER TABLE `attributions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formations`
--
ALTER TABLE `formations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `attributions`
--
ALTER TABLE `attributions`
  ADD CONSTRAINT `attributions_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`),
  ADD CONSTRAINT `attributions_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `cours_formation_id_foreign` FOREIGN KEY (`Formation_id`) REFERENCES `formations` (`id`);

--
-- Contraintes pour la table `formations`
--
ALTER TABLE `formations`
  ADD CONSTRAINT `formations_idenseignant_foreign` FOREIGN KEY (`idEnseignant`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_qcm_id_foreign` FOREIGN KEY (`Qcm_id`) REFERENCES `quizzes` (`id`);

--
-- Contraintes pour la table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_enseignant_id_foreign` FOREIGN KEY (`enseignant_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `quizzes_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
