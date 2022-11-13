import React from 'react';
import { GetServerSideProps, GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../../lib/prisma';
import style from '../scss/index.module.scss';
import Footer from "../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
// export const getStaticProps: GetStaticProps = async () => {
//   // const channels = await prisma.channel.findMany();
//   // return {
//   //   props: { channels },
//   //   revalidate: 10,
//   // };
// };

type Props = {
	channels: any[];
	session: Session;
};

const Blog: React.FC<Props> = ({ channels, session }) => {
	return (
		<div className={style.index_body}>
			<Layout session={session}>
				<section className={style.advertising}>
					<div className={style.container}>
						<div className={style.advertising__title}>
							<h1>
								Эффективная реклама <br /> в Telegram
							</h1>
							<p className={style.text}>
								Мы помогаем найти целевую аудиторию в Telegram и запускать
								эффективные рекламные кампании
							</p>
							<a
								href="https://docs.google.com/forms/d/1aV4RXuysmTOLIc-9rDN75zIrc94mkw4jV5br6HY-pxM/edit"
								className={style.advertising__btn}
							>
								Начать сейчас
							</a>
						</div>
						<div className={style.advantage}>
							<div
								className={`${style.advantage__user} ${style.advantage__item}`}
							>
								<p className={style.advantage__number}>207 228</p>
								<p className={style.advantage__text}>
									новых пользователей на бирже
								</p>
							</div>
							<div
								className={`${style.advantage__channel} ${style.advantage__item}`}
							>
								<p className={style.advantage__number}>7 754</p>
								<p className={style.advantage__text}>
									каналов, проверенных вручную
								</p>
							</div>
							<div
								className={`${style.advantage__orders} ${style.advantage__item}`}
							>
								<p className={style.advantage__number}>460 482</p>
								<p className={style.advantage__text}>
									успешно реализованных заказов
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className={style.partners}>
					<div className={style.container}>
						<div className={style.partners__title}>
							<h2>Нам доверяют</h2>
						</div>
						<div className={style.partners__items}>
							<div className={style.partners__google}>
								<img src="img/partners/google.svg" alt="" />
							</div>
							<div className={style.partners__yandex}>
								<img src="img/partners/yandex.svg" alt="" />
							</div>
							<div className={style.partners__visa}>
								<img src="img/partners/visa.svg" alt="" />
							</div>
							<div className={style.partners__master}>
								<img src="img/partners/master.svg" alt="" />
							</div>
						</div>
					</div>
				</section>
				<section className={style.how_it_works}>
					<div className={style.container}>
						<div
							className={`${style.how_it_works__registration} ${style.how_it_works__items}`}
						>
							<div className={style.registration__title}>
								<div className={style.registration__icon}>
									<img
										className={style.icon__number}
										src="img/how_it_works/01.svg"
										alt=""
									/>
									<img src="img/how_it_works/reg.svg" alt="" />
								</div>
								<div className={style.registration__subtitle}>
									<h3>Регистрируйте аккаунт</h3>
								</div>
							</div>
							<div className={style.registration__text}>
								<p className={style.text}>
									Пройдите быструю регистрацию чтобы активировать аккаунт.
								</p>
								<a href="https://docs.google.com/forms/d/1aV4RXuysmTOLIc-9rDN75zIrc94mkw4jV5br6HY-pxM/edit">
									регистрация
								</a>
							</div>
						</div>
					</div>
					<div className={style.how_it_works__wrapper}>
						<div className={style.container}>
							<div
								className={`${style.how_it_works__catalog} ${style.how_it_works__items}`}
							>
								<div className={style.catalog__text}>
									<p className={style.text}>
										Выберите подходящие каналы в каталоге
									</p>
								</div>
								<div className={style.catalog__title}>
									<div className={style.catalog__icon}>
										<img
											className={style.icon__number}
											src="img/how_it_works/02.svg"
											alt=""
										/>
										<img src="img/how_it_works/catalog.svg" alt="" />
									</div>
									<div className={style.catalog__subtitle}>
										<h3>Каталог каналов</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={style.container}>
						<div
							className={`${style.how_it_works__balance} ${style.how_it_works__items}`}
						>
							<div className={style.balance__title}>
								<div className={style.balance__icon}>
									<img
										className={style.icon__number}
										src="img/how_it_works/03.svg"
										alt=""
									/>
									<img src="img/how_it_works/balance.svg" alt="" />
								</div>
								<div className={style.balance__subtitle}>
									<h3>Пополните баланс</h3>
								</div>
							</div>
							<div className={style.balance__text}>
								<p className={style.text}>Пополните баланс удобным способом:</p>
								<p>Visa/MasterCard/МИР, Qiwi Банковский перевод</p>
								<div className={style.balance__img}>
									<img src="img/how_it_works/visa.svg" alt="" />
									<img src="img/how_it_works/master.svg" alt="" />
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className={style.start_working}>
					<div className={style.container}>
						<div className={style.start_working__wrapper}>
							<div className={style.start_working__title}>
								<h2>Начните работать с нами</h2>
							</div>
							<div className={style.start_working__advantage}>
								<div className={style.start_working__advertising}>
									<div
										className={`${style.start_working__subtitle_advertising} ${style.start_working__subtitle}`}
									>
										<p>Рекламодателям</p>
									</div>
									<div className={style.line}></div>
									<div className={style.start_working__text_advertising}>
										<p className={style.text}>
											Продвигайте свой бизнес с помощью эффективной рекламы в
											Telegram
										</p>
									</div>
								</div>
								<div className={style.start_working__admin}>
									<div
										className={`${style.start_working__subtitle_admin} ${style.start_working__subtitle}`}
									>
										<p>Администраторам</p>
									</div>
									<div className={style.line}></div>
									<div className={style.start_working__text_admin}>
										<p className={style.text}>
											Зарабатывайте деньги на размещении рекламы в своих каналах
											и группах
										</p>
									</div>
								</div>
								<div className={style.start_working__agency}>
									<div
										className={`${style.start_working__subtitle_agency} ${style.start_working__subtitle}`}
									>
										<p>Агентствам</p>
									</div>
									<div className={style.line}></div>
									<div className={style.start_working__text_agency}>
										<p className={style.text}>
											Telegram – новый маркетинговый канал для ваших клиентов
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className={style.registration}>
					<div className={style.container}>
						<div className={style.registration__wrapper}>
							<div className={style.registation__title}>
								<h4>Регистрация</h4>
							</div>
							<div className={style.registation__subtitle}>
								<p>Создайте аккаунт через Telegram всего за пару кликов</p>
								<a href="#">Создать аккаунт</a>
							</div>
						</div>
					</div>
				</section>
				<section className={style.questions}>
					<Container className="d-flex flex-column flex-xl-row justify-content-between">
						<div className={`${style.questions__wrapper} ${style.questions__wrapper_background}`}>
							<div className={style.questions__title}>
								<h4>Возникли вопросы?</h4>
								<a href="#">Напишите нам и ответим Вам в ближайшее время</a>
							</div>
						</div>
						<div className={style.questions__wrapper}>
							<div className={style.questions__social_media}>
								<div className={style.questions__social_media__wrapper}>
									<div
										className={`${style.questions__vk} ${style.questions__item}`}
									>
										<a href="#">Написать в Вконтакте</a>
									</div>
									<div
										className={`${style.questions__vk} ${style.questions__item}`}
									>
										<a href="#">Написать в Facebook</a>
									</div>
									<div
										className={`${style.questions__vk} ${style.questions__item}`}
									>
										<a href="#">Написать в Telegram</a>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</section>
				<Footer />
			</Layout>
		</div>
	);
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { req } = ctx;

	const session = await getSession({ req });

	return {
		props: {
			session: await session,
		},
	};
};
