import { Given, Then, When } from '@cucumber/cucumber';
import { Click, PageElement, By, isVisible, isClickable } from '@serenity-js/web';
import { actorCalled, Duration, Wait } from "@serenity-js/core";
import localize from '../../support/localize';
import { QuizRecommender } from '../page-objects/cc_quizrecommender_page';
import ClickAnswer from "../tasks/cc.tasks";

Then(/^I select each quiz recommender answer "([^\"]*)"$/, async function (answers) {
    //let page = new QuizRecommender();
    console.log(answers.split(">").length + " Questions");
    await answers.split(">").forEach(answer => {
      if (answer.includes("+")) {
          answer.split("+").forEach(option => {
          option = localize(option.trim());
          console.log("Selected: "+option.trim());
          // actorCalled('I').attemptsTo(
          //     Wait.until(page.getQuizRecommenderAnswerByText(option), isVisible()),
          //     Click.on(page.getQuizRecommenderAnswerByText(option)),
          // );
          })
      } else {
          answer = localize(answer.trim());
          console.log("Answered: " + answer.trim());
          actorCalled('I').attemptsTo(
            Wait.for(Duration.ofSeconds(10)),
            Click.on(PageElement.located(By.xpath(`//div[@class="quiz-options"]//*[@aria-label="${answer}"]`))),
            Wait.upTo(Duration.ofSeconds(10)).until(PageElement.located(By.css('.quiz-action-container button')), isClickable()),
            Click.on(PageElement.located(By.css('.quiz-action-container button'))),
            Wait.for(Duration.ofSeconds(10)),
          );
    } 
  });
});

Then(/^I should see quiz recommender single result title is "([^\"]*)"$/, iCheckQuizRecommenderSingleResultTitle);

/**
 * Step Definition:
 * ```
 * /^I select each quiz recommender answer "([^\"]*)"$/
 * ```
 * @param {string} answers answers
 */
async function iSelectQuizRecommenderAnswers(answers) {
    // let page = new QuizRecommender();
    // console.log(answers.split(">").length + " Questions");
    // answers.split(">").forEach(answer => {
    //   if (answer.includes("+")) {
    //     answer.split("+").forEach(option => {
    //       option = localize(option.trim());
    //       console.log("Selected: "+option.trim());
    //       //this.page.getQuizRecommenderAnswerByText(option).click();
    //       actorCalled('I').attemptsTo(
    //         Wait.until(page.getQuizRecommenderAnswerByText(option), isVisible()),
    //         Click.on(page.getQuizRecommenderAnswerByText(option)),
    //       );
    //     })
    //   } else {
    //     answer = localize(answer.trim());
    //     console.log("Answered: "+answer.trim());
    //     actorCalled('I').attemptsTo(
    //       Wait.upTo(Duration.ofSeconds(10)).until(page.getQuizRecommenderAnswerByText(answer), isClickable()),
    //       Click.on(new QuizRecommender().getQuizRecommenderAnswerByText(answer)),
    //     );
    //     console.log("test");
    //   }
    //   //this.page.clickNextButton();
    //   // actorCalled('I').attemptsTo(
    //   // Click.on(PageElement.located(By.css('.quiz-action-container button'))),
    //   // );
    //})
    //console.log(browser.getUrl())
    await actorCalled('I').attemptsTo(
      console.log(answers),
      Wait.upTo(Duration.ofSeconds(10)).until(page.getQuizRecommenderAnswerByText(answers), isClickable()),
      Click.on(new QuizRecommender().getQuizRecommenderAnswerByText(answers)),
    );
  }
  
  /**
   * Step Definition:
   * ```
   * /^I should see quiz recommender single result title is "([^\"]*)"$/
   * ```
   * @param {string} title title
   */
async function iCheckQuizRecommenderSingleResultTitle(title) {
    console.log("test");
    
    // let text = localize(title);
    // let formattedTitle = this.page.singleRecommendationTitle
    // this.page.retryExpect(5, 1000, () => {expect(formattedTitle).toContain(text);});
    // console.log("Expected title: "+ text);
    // console.log("Observed title: "+ formattedTitle); 
  }