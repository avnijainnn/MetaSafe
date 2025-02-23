import requests

class SimpleContentModerator:
    def __init__(self, perspective_api_key):
        self.perspective_api_key = perspective_api_key
        
    def get_toxicity_score(self, text):
        """
        Get toxicity scores from Perspective API
        Works with both English and Romanized Hindi
        """
        url = f"https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key={self.perspective_api_key}"
        
        payload = {
            'comment': {'text': text},
            'languages': ['en'],  # API will still work with Romanized Hindi
            'requestedAttributes': {
                'TOXICITY': {},
                'SEVERE_TOXICITY': {},
                'IDENTITY_ATTACK': {},
                'INSULT': {},
                'THREAT': {}
            }
        }
        
        try:
            response = requests.post(url, json=payload)
            if response.status_code == 200:
                data = response.json()
                scores = {}
                for attr, score in data['attributeScores'].items():
                    scores[attr.lower()] = {
                        'score': score['summaryScore']['value'],
                        'level': self._get_toxicity_level(score['summaryScore']['value'])
                    }
                return {
                    'success': True,
                    'text': text,
                    'scores': scores
                }
            else:
                return {
                    'success': False,
                    'error': f'API Error: {response.status_code}',
                    'text': text
                }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'text': text
            }
    
    def _get_toxicity_level(self, score):
        """Convert numerical score to human-readable level"""
        if score < 0.3:
            return 'Low'
        elif score < 0.7:
            return 'Medium'
        else:
            return 'High'

# Example usage with single user input
def main():
    # Initialize moderator with your API key
    api_key = 'AIzaSyDksmQFrtut8g_7-36MaiqM3gN3_yC_Oq0'  # Replace with your actual API key
    moderator = SimpleContentModerator(api_key)
    
    text = input("\nEnter a comment: ").strip()
    
    result = moderator.get_toxicity_score(text)
    
    print(f"\n🔍 Analyzing: {result['text']}")
    
    if result['success']:
        print("\n📊 Toxicity Scores:")
        for metric, data in result['scores'].items():
            print(f"{metric.capitalize()}:")
            print(f"  Score: {data['score']:.3f}")
            print(f"  Level: {data['level']}")
    else:
        print(f"❌ Error: {result['error']}")
    
    print("-" * 50)

if __name__ == "__main__":
    main()
